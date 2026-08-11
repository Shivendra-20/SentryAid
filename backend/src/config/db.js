import mongoose from "mongoose";
import { env } from "./env.js";

export const connectDB = async () => {
  try {
    await mongoose.connect(env.mongoUri);
    console.log("mongoDB successfully connected!!");
  } catch (error) {
    console.error("error connecting mongodb", error);
    process.exit(1);
  }
};
