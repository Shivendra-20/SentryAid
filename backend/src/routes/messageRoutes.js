import express from "express";
import {
  createMessage,
  deleteMessage,
  getAllMessage,
  updateMessage,
  markAsReadByVolunteer
} from "../controllers/messageController.js";

const router = express.Router();

router.get("/", getAllMessage);
router.post("/", createMessage);
router.put("/:id", updateMessage);
router.delete("/:id", deleteMessage);
router.patch("/:messageId/read-by-volunteer/:volunteerId", markAsReadByVolunteer);

export default router;
