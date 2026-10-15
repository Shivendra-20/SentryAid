import mongoose from "mongoose";
import { hashPassword } from "../utils/password.js";

const volunteerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true, // added password field
    },
    phone: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    bloodGroup: {
      type: String,
      default: "",
    },
    allergies: {
      type: String,
      default: "",
    },
    medicalCondition: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      default: "active",
    },
    type: {
      type: String,
      default: "volunteer",
    },
    request: {
      type: String,
      default: "pending",
    },
    score: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

volunteerSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await hashPassword(this.password);
  next();
});

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

export default Volunteer;
