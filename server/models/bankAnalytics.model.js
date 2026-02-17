import mongoose from "mongoose";

const monthlySaleSchema = new mongoose.Schema({
  month: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
});

const bankAnalyticsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
    },

    totalCustomers: {
      type: Number,
      default: 0,
    },

    totalRecommendations: {
      type: Number,
      default: 0,
    },

    revenueGenerated: {
      type: Number,
      default: 0,
    },

    genderStats: {
      male: { type: Number, default: 0 },
      female: { type: Number, default: 0 },
      other: { type: Number, default: 0 },
    },

    monthlySales: [monthlySaleSchema],
  },
  { timestamps: true }
);

const BankAnalytics = mongoose.model("BankAnalytics", bankAnalyticsSchema);

export default BankAnalytics;
