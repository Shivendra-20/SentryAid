import Admin from "../model/adminModel.js";
import {
  hashPassword,
  comparePassword,
  isPlainTextPassword,
  sanitizeUser,
} from "../utils/password.js";
import { signToken } from "../middleware/auth.js";

export async function loginAdmin(req, res) {
  try {
    const { name, password } = req.body;

    const admin = await Admin.findOne({ name });

    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    const passwordValid = await comparePassword(password, admin.password);

    if (passwordValid) {
      // already hashed — nothing to migrate
    } else if (isPlainTextPassword(password, admin.password)) {
      // legacy plain-text password → hash it in place (bypass pre-save)
      await Admin.updateOne(
        { _id: admin._id },
        { $set: { password: await hashPassword(password) } }
      );
    } else {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = signToken(admin);

    // ✅ success
    res.status(200).json({ ...sanitizeUser(admin), token });
  } catch (error) {
    console.error("Error in loginAdmin controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function createAdmin(req, res) {
  try {
    const { name, password } = req.body;

    const admin = new Admin({ name, password });
    const savedAdmin = await admin.save();

    res.status(201).json(sanitizeUser(savedAdmin));
  } catch (error) {
    console.error("Error in createAdmin controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
