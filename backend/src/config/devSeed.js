import User from "../model/userModel.js";
import Volunteer from "../model/volunteerModel.js";
import Admin from "../model/adminModel.js";
import { comparePassword } from "../utils/password.js";
import { env } from "./env.js";

/** Demo credentials documented in README.md — development only. */
const DEMO_PASSWORD = process.env.DEMO_PASSWORD || "1234";

/** Reset a demo account's password if it no longer matches DEMO_PASSWORD. */
async function syncPassword(account) {
  let matches = false;
  try {
    matches = await comparePassword(DEMO_PASSWORD, account.password);
  } catch {
    matches = false; // legacy / malformed hash → re-hash below
  }
  if (!matches) {
    // assigning + save() triggers the pre-save hook, so it gets hashed
    account.password = DEMO_PASSWORD;
    await account.save();
    console.log(`🔑 Demo account password reset → ${account.name} / ${DEMO_PASSWORD}`);
  }
}

/** Local laptop only — auto-approve signups and keep the demo logins working */
export async function runDevSeed() {
  if (env.isProduction) return;

  const activated = await Volunteer.updateMany({}, { $set: { status: "active" } });
  if (activated.modifiedCount > 0) {
    console.log(`✅ Set ${activated.modifiedCount} volunteer(s) to active for SOS`);
  }

  // ─── Admin: exactly one account, never a second one ───
  const adminCount = await Admin.countDocuments();
  if (adminCount === 0) {
    await Admin.create({ name: "admin", password: DEMO_PASSWORD });
    console.log(`✅ Demo admin created → admin / ${DEMO_PASSWORD}`);
  } else {
    const admin = await Admin.findOne({ name: "admin" });
    if (admin) {
      await syncPassword(admin);
    } else {
      console.log("⚠️ An admin already exists under a different name — not creating another admin.");
    }
  }

  // ─── Demo user: user1 ───
  const user = await User.findOne({ name: "user1" });
  if (!user) {
    await User.create({
      name: "user1",
      email: "user1@example.com",
      password: DEMO_PASSWORD,
      request: "accepted", // so the login page doesn't block with "under review"
    });
    console.log(`✅ Demo account created → user1 / ${DEMO_PASSWORD}`);
  } else {
    await syncPassword(user);
  }

  // ─── Demo volunteer: v1 ───
  const volunteer = await Volunteer.findOne({ name: "v1" });
  if (!volunteer) {
    await Volunteer.create({
      name: "v1",
      email: "v1@example.com",
      password: DEMO_PASSWORD,
      request: "accepted", // admin-approved, otherwise login is blocked
      status: "active", // eligible to receive SOS alerts
    });
    console.log(`✅ Demo account created → v1 / ${DEMO_PASSWORD}`);
  } else {
    await syncPassword(volunteer);
  }
}
