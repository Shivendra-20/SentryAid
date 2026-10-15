import mongoose from "mongoose";
import { hashPassword } from "../utils/password.js";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Name is required
    },
    email: {
      type: String,
      required: true, // Email is required
    },
    password: {
      type: String,
      required: true, // Password is required
    },
    phone: {
      type: String,
      default: "", // Optional
    },
    address: {
      type: String,
      default: "", // Optional
    },
    bloodGroup: {
      type: String,
      default: "", // Optional
    },
    allergies: {
      type: String,
      default: "", // Optional
    },
    medicalCondition: {
      type: String,
      default: "", // Optional
    },
    type: {
      type: String,
      default: "user", // Default role is "user"
    },
    request: {
      type: String,
      default: "pending", // Default request status
    },
  },
  {
    timestamps: true, // Automatically adds createdAt & updatedAt
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hashPassword(this.password);
  next();
});

const User = mongoose.model("User", userSchema);

export default User;
