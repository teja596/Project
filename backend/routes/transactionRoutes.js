import { Router } from "express";
import {
  withdrawlTransaction,
  depositTransaction,
  getTransactions,
} from "../controllers/transactionController.js";
import protect from "../middleware/authMiddleware.js";
const router = Router();

router
  .post("/withdrawl", protect, withdrawlTransaction)
  .post("/deposit", protect, depositTransaction)
  .get("/", protect, getTransactions);

export default router;
