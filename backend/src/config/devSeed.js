import User from "../model/userModel.js";
import Volunteer from "../model/volunteerModel.js";
import Admin from "../model/adminModel.js";
import { env } from "./env.js";

/** Local laptop only — auto-approve signups and ensure a test admin exists */
export async function runDevSeed() {
  if (env.isProduction) return;

  const activated = await Volunteer.updateMany({}, { $set: { status: "active" } });

  if (activated.modifiedCount > 0) {
    console.log(`✅ Set ${activated.modifiedCount} volunteer(s) to active for SOS`);
  }

  const adminCount = await Admin.countDocuments();
  if (adminCount === 0) {
    const initialPassword =
      process.env.ADMIN_INITIAL_PASSWORD || "admin123";
    await Admin.create({ name: "admin", password: initialPassword });
    console.log("✅ Dev admin created → login: admin / <ADMIN_INITIAL_PASSWORD>");
  }
}
