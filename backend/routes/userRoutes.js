import express from "express";
const router = express.Router();
import protect from "../middleware/authMiddleware.js";

import {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
} from "../controllers/userController.js";

router
  .post("/login", authUser)
  .get("/profile", protect, getUserProfile)
  .put("/profile", protect, updateUserProfile)
  .post("/", registerUser);
export default router;
