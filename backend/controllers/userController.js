import User from "../models/userModel.js";
import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";

//@desc    Auth User & get Token
//@route    POST /api/users/login
//@access   public
export const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
      accountCreated: user.accountCreated,
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

//@desc     GET user Profile
//@route    GET /api/users/profile
//@access   private
export const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById({ _id: req.user._id });
  if (user) {
    res.json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      accountCreated: user.accountCreated,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});

//@desc     POST user Profile
//@route    POST /api/users/
//@access   public
export const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json({
      name: user.name,
      email: user.email,
      _id: user._id,
      isAdmin: user.isAdmin,
      token: generateToken(user.id),
    });
  } else {
    res.status(400);
    throw new Error("User Not Found");
  }
});

//@desc     GET user Profile
//@route    PUT /api/users/profile
//@access   private
export const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById({ _id: req.user._id });
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (!req.body.password) {
      res.status(400);
      throw new Error("Error: password required");
    }

    if (!(await user.matchPassword(req.body.password))) {
      res.status(400);
      throw new Error("Error: Invalid Passoword combination");
    }

    user.password = req.body.newPassword;
    const updatedUser = await user.save();
    res.json({
      _id: updatedUser._id,
      email: updatedUser.email,
      name: updatedUser.name,
      isAdmin: updatedUser.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User Not Found");
  }
});
