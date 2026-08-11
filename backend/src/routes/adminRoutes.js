import express from "express";
import { createAdmin, loginAdmin } from "../controllers/adminController.js";

const router = express.Router();

router.post("/login", loginAdmin);
router.post("/", createAdmin); // for adding a new admin

export default router;
