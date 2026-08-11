import mongoose from "mongoose";

const bulletinMsgSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true, // Name is required
    },
    type: {
      type: String,
      required: true, // Type is required
    },
    title: {
      type: String,
      required: true, // Title is required
    },
    msg: {
      type: String,
      required: true, // Message is required
    },
  },
  {
    timestamps: true, // Adds createdAt & updatedAt
  }
);

const BulletinMsg = mongoose.model("BulletinMsg", bulletinMsgSchema);

export default BulletinMsg;
