import mongoose from "mongoose";

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

const Volunteer = mongoose.model("Volunteer", volunteerSchema);

export default Volunteer;
