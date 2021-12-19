import Transaction from "../models/transaction.js";
import Account from "../models/account.js";
import asyncHandler from "express-async-handler";

export const withdrawlTransaction = asyncHandler(async (req, res) => {
  const accountDetails = await Account.findOne({ userId: req.user._id });

  if (!accountDetails) {
    res.status(404);
    throw new Error("Error: No Account Found");
  }

  const { amount, PIN } = req.body;
  if (PIN !== accountDetails.PIN) {
    res.status(400);
    throw new Error("Error: Invalid PIN");
  }
  if (accountDetails.balence < amount) {
    res.status(404);
    throw new Error("Error: Insufficient Funds");
  }
  const transaction = await Transaction.create({
    userId: req.user._id,
    email: req.user.email,
    accountNumber: accountDetails.accountNumber,
    type: "Withdrawl",
    amount,
    balence: accountDetails.balence - amount,
    status: "completed",
  });

  if (!transaction) {
    res.status(400);
    throw new Error("Error: Transaction Failed");
  }
  accountDetails.balence = accountDetails.balence - amount;

  // update account balence
  const updatedAccountDetails = await accountDetails.save();
  if (!updatedAccountDetails) {
    res.status(400);
    throw new Error("Error: Transaction Failed");
  }

  res.status(200).json({ message: `Amount of ${amount} Withdrawl Successful` });
});

export const depositTransaction = asyncHandler(async (req, res) => {
  const accountDetails = await Account.findOne({ userId: req.user._id });

  if (!accountDetails) {
    res.status(404);
    throw new Error("Error: No Account Found");
  }

  const { amount, PIN } = req.body;
  if (PIN !== accountDetails.PIN) {
    res.status(400);
    throw new Error("Error: Invalid PIN");
  }
  const transaction = await Transaction.create({
    userId: req.user._id,
    email: req.user.email,
    accountNumber: accountDetails.accountNumber,
    type: "Deposit",
    amount,
    balence: accountDetails.balence + amount,
    status: "completed",
  });

  if (!transaction) {
    res.status(400);
    throw new Error("Error: Transaction Failed");
  }
  accountDetails.balence = accountDetails.balence + amount;

  // update account balence
  const updatedAccountDetails = await accountDetails.save();
  if (!updatedAccountDetails) {
    res.status(400);
    throw new Error("Error: Transaction Failed");
  }

  res.status(200).json({ message: `Amount of ${amount} Deposit Successful` });
});

export const getTransactions = asyncHandler(async (req, res) => {
  const transactions = await Transaction.find({ userId: req.user._id });
  res.json(transactions);
});
