import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },

    age: {
      type: Number,
      required: true,
      min: 18,
      max: 100,
    },

    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },

    maritalStatus: {
      type: Number, // 1 = Married, 0 = Unmarried
      enum: [0, 1],
      required: true,
    },

    cityTier: {
      type: Number, // 1 = Tier1, 2 = Tier2, 3 = Tier3
      enum: [1, 2, 3],
      required: true,
    },

    occupation: {
      type: String,
      required: true,
    },

    accountBalance: {
      type: Number,
      required: true,
    },

    dailyTransactionFrequency: {
      type: Number,
      required: true,
    },

    onlineShoppingFrequency: {
      type: Number,
      required: true,
    },

    monthlyIncome: {
      type: Number,
      required: true,
    },

    numberOfKids: {
      type: Number,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
