import Account from "../models/account.js";
import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
export const getAccountDetails = asyncHandler(async (req, res) => {
  const userId = req.params.userId;
  const account = await Account.findOne({ userId: userId });
  if (!account) {
    res.status(404);
    throw new Error("Error: Account Not Found");
  }
  return res.json(account);
});

export const createAccountRequest = asyncHandler(async (req, res) => {
  const { name, email, aadharNumber, PIN } = req.body;
  const accountExisted = await Account.findOne({ email });
  if (accountExisted) {
    if (accountExisted.status === "pending") {
      res.status(400);
      throw new Error("Error: Account Approvel in Progress ");
    }
    res.status(400);
    throw new Error("Error: Account already Created");
  }

  //create account document
  const account = await Account.create({
    userId: req.user._id,
    name,
    email,
    aadharNumber,
    PIN,
  });
  if (!account) {
    res.status(404);
    throw new Error("Error: Account not Created");
  }

  return res.json(account);
});

export const approveAccountRequest = asyncHandler(async (req, res) => {
  const account = await Account.findById({ _id: req.params.id });
  if (!account) {
    res.status(404);
    throw new Error("Error: Account not Found");
  }
  account.status = "active";
  account.accountNumber = new Date().valueOf();
  const updatedAccount = await account.save();
  const accountUser = await User.findById({ _id: req.body.userId });
  accountUser.accountCreated = "true";
  const updatedAccountUser = await accountUser.save();
  return res.json(updatedAccount);
});

export const getAccounts = asyncHandler(async (req, res) => {
  const accounts = await Account.find();
  if (!accounts) {
    res.status(404);
    throw new Error("Error: Account Not Found");
  }
  return res.json(accounts);
});

export const updatePIN = asyncHandler(async (req, res) => {
  const { PIN, newPIN } = req.body;
  //fetch account details
  const accountDetails = await Account.findById(req.params.id);
  if (!accountDetails) {
    res.status(404);
    throw new Error("Error: No account Details found");
  }

  // check wheter pin is matched
  if (PIN !== accountDetails.PIN) {
    res.status(400);
    throw new Error("Error: Invalid PIN Entered");
  }

  accountDetails.PIN = newPIN;

  const updatedAccount = await accountDetails.save();

  if (!updatedAccount) {
    res.status(500);
    throw new Error("Error: Unable to Update PIN");
  }

  return res.json({
    message: `PIN Updated successfullt for ${updatedAccount.accountNumber}`,
  });
});
