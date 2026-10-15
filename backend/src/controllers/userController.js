import User from "../model/userModel.js";
import {
  hashPassword,
  comparePassword,
  isPlainTextPassword,
  sanitizeUser,
} from "../utils/password.js";
import { signToken } from "../middleware/auth.js";

export async function getAllUsers(req, res) {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.status(200).json(users.map(sanitizeUser));
  } catch (error) {
    console.error("error in getAllUsers controller", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json(sanitizeUser(user));
  } catch (error) {
    console.error("error in getUserById controller", error);
    res.status(500).json({ message: "internal server error" });
  }
}

export async function createUser(req, res) {
  try {
    const {
      name,
      email,
      password, // new required field
      phone,
      address,
      bloodGroup,
      allergies,
      medicalCondition,
      type,
      request,
    } = req.body;

    const user = new User({
      name,
      email,
      password,
      phone,
      address,
      bloodGroup,
      allergies,
      medicalCondition,
      type,
      request: request ?? "pending",
    });

    const savedUser = await user.save();

    res.status(201).json(sanitizeUser(savedUser));
  } catch (error) {
    console.error("Error in createUser controller", error);
    res.status(500).json({ message: "Internal server errorrr" });
  }
}

export async function updateUser(req, res) {
  try {
    const {
      name,
      email,
      password, // allow password update
      phone,
      address,
      bloodGroup,
      allergies,
      medicalCondition,
      type,
      request,
    } = req.body;

    const update = {
      name,
      email,
      phone,
      address,
      bloodGroup,
      allergies,
      medicalCondition,
      type,
      request,
    };

    if (password) {
      update.password = await hashPassword(password);
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      update,
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(sanitizeUser(updatedUser));
  } catch (error) {
    console.error("Error in updateUser controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function deleteUser(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(sanitizeUser(deletedUser));
  } catch (error) {
    console.error("Error in deleteUser controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}

export async function loginUser(req, res) {
  try {
    const { name, password } = req.body;

    // find user by name
    const user = await User.findOne({ name });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const passwordValid = await comparePassword(password, user.password);

    if (passwordValid) {
      // already hashed — nothing to migrate
    } else if (isPlainTextPassword(password, user.password)) {
      // legacy plain-text password → hash it in place (bypass pre-save)
      await User.updateOne(
        { _id: user._id },
        { $set: { password: await hashPassword(password) } }
      );
    } else {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = signToken(user);

    // ✅ success
    res.status(200).json({ ...sanitizeUser(user), token });
  } catch (error) {
    console.error("Error in loginUser controller", error);
    res.status(500).json({ message: "Internal server error" });
  }
}
