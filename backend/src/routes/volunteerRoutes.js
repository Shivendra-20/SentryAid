import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  loginVolunteer,
  updateUser,
} from "../controllers/volunteerController.js";
import { authenticate } from "../middleware/auth.js";

const router = express.Router();

router.post("/login", loginVolunteer);

router.post("/", createUser);

router.get("/", authenticate, getAllUsers);
router.get("/:id", authenticate, getUserById);
router.put("/:id", authenticate, updateUser);
router.delete("/:id", authenticate, deleteUser);

export default router;
