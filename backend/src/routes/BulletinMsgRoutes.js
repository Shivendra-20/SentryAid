import express from "express";
import {
  createBulletinMsg,
  getAllBulletinMsgs,
} from "../controllers/BulletinMsgController.js";
const router = express.Router();

// Fetch all bulletin messages
router.get("/", getAllBulletinMsgs);

// Create a new bulletin message
router.post("/", createBulletinMsg);

export default router;
