import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    category: {
      type: String,
      required: true,
      enum: ["Credit", "Loan", "Deposit", "Insurance", "Investment"],
    },

    totalSold: {
      type: Number,
      default: 0,
    },

    revenueGenerated: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", productSchema);

export default Product;
