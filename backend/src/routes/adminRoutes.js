import express from "express";
import { createAdmin, loginAdmin } from "../controllers/adminController.js";
import { authenticate, requireRole } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginAdmin);

// for adding a new admin
router.post("/", authenticate, requireRole("admin"), createAdmin);

export default router;
