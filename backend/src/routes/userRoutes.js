import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  loginUser,
  updateUser,
} from "../controllers/userController.js";

const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

router.post("/login", loginUser);

export default router;
