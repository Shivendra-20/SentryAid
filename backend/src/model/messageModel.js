import mongoose from "mongoose";

const messageSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    message: {
      type: String,
      required: true,
    },
    seen: {
      type: [String], // Array of user IDs / emails / names who saw it
      default: [],
    },
    seenByVolunteers: {
      type: [String], // Array of volunteer IDs who saw it
      default: [],
    },
  },
  {
    timestamps: true, // createdAt & updatedAt
  }
);

const Message = mongoose.model("Message", messageSchema);

export default Message;
