import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  loginVolunteer,
  updateUser,
} from "../controllers/volunteerController.js";



const router = express.Router();

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", loginVolunteer);

export default router;
