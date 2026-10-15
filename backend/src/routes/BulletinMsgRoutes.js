import express from "express";
import {
  createBulletinMsg,
  getAllBulletinMsgs,
} from "../controllers/BulletinMsgController.js";
import { authenticate } from "../middleware/auth.js";
const router = express.Router();

router.use(authenticate);

// Fetch all bulletin messages
router.get("/", getAllBulletinMsgs);

// Create a new bulletin message
router.post("/", createBulletinMsg);

export default router;
