import express from "express";
import {
  createNotification,
  getUserNotifications,
  markAsRead,
  markAllAsRead
} from "../controllers/notificationController.js";

const router = express.Router();

router.post("/", createNotification);
router.get("/user/:userId", getUserNotifications);
router.put("/:id/read", markAsRead);
router.put("/user/:userId/read-all", markAllAsRead);

export default router;