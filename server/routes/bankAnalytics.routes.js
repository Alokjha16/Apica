import express from "express";
import {
  getBankAnalytics,
  upsertBankAnalytics,
} from "../controllers/bankAnalytics.controller.js";

const router = express.Router();

// Get analytics by bank email
router.get("/:email", getBankAnalytics);

// Create or update analytics
router.post("/", upsertBankAnalytics);

export default router;
