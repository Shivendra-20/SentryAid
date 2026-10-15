import express from "express";
import {
  createNotification,
  getUserNotifications,
  markAsRead,
  markAllAsRead
} from "../controllers/notificationController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.use(authenticate);

router.post("/", createNotification);
router.get("/user/:userId", getUserNotifications);
router.put("/:id/read", markAsRead);
router.put("/user/:userId/read-all", markAllAsRead);

export default router;
