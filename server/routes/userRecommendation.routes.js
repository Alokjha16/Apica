import express from "express";
import { getUserRecommendation } from "../controllers/userRecommendation.controller.js";

const router = express.Router();

router.get("/:id/recommendation", getUserRecommendation);

export default router;
