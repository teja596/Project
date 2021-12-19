import { Router } from "express";
import protect from "../middleware/authMiddleware.js";
import {
  getAccountDetails,
  createAccountRequest,
  approveAccountRequest,
  getAccounts,
  updatePIN,
} from "../controllers/accountController.js";

const router = Router();

router
  .get("/", protect, getAccounts)
  .get("/:userId", protect, getAccountDetails)
  .post("/", protect, createAccountRequest)
  .put("/update-pin/:id", protect, updatePIN)
  .put("/:id", protect, approveAccountRequest);

export default router;
