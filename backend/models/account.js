import mongoose from "mongoose";
const accountSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    aadharNumber: {
      type: Number,
      unique: true,
    },
    status: {
      type: String,
      required: true,
      default: "pending",
    },
    balence: {
      type: Number,
      required: true,
      default: 0,
    },
    PIN: {
      type: String,
      required: true,
    },
    accountNumber: {
      type: Number,
    },
  },
  { timestamps: true }
);

const Account = mongoose.model("Account", accountSchema);

export default Account;
