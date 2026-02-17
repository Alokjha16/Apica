import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import Product from "./models/product.model.js";

dotenv.config();

const seedProducts = async () => {
  try {
    await connectDB();

    await Product.deleteMany();

    await Product.insertMany([
      // Deposits
      {
        name: "Savings Account",
        category: "Deposit",
        totalSold: 8500,
        revenueGenerated: 10200000,
      },
      {
        name: "Fixed Deposit",
        category: "Deposit",
        totalSold: 4200,
        revenueGenerated: 18900000,
      },

      // Loans
      {
        name: "Personal Loan",
        category: "Loan",
        totalSold: 1900,
        revenueGenerated: 123500000,
      },
      {
        name: "Home Loan",
        category: "Loan",
        totalSold: 850,
        revenueGenerated: 212500000,
      },
      {
        name: "Education Loan",
        category: "Loan",
        totalSold: 600,
        revenueGenerated: 72000000,
      },

      // Credit Cards
      {
        name: "Cashback Card",
        category: "Credit",
        totalSold: 2800,
        revenueGenerated: 9800000,
      },
      {
        name: "Travel Card",
        category: "Credit",
        totalSold: 1400,
        revenueGenerated: 8400000,
      },
      {
        name: "Premium Card",
        category: "Credit",
        totalSold: 950,
        revenueGenerated: 14250000,
      },

      // Insurance
      {
        name: "Term Life Insurance",
        category: "Insurance",
        totalSold: 1200,
        revenueGenerated: 14400000,
      },
      {
        name: "Health Insurance",
        category: "Insurance",
        totalSold: 1650,
        revenueGenerated: 13200000,
      },

      // Investments
      {
        name: "Mutual Fund SIP",
        category: "Investment",
        totalSold: 3300,
        revenueGenerated: 18150000,
      },
    ]);

    console.log("✅ Products seeded successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedProducts();
