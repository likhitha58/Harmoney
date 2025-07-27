import express from "express";
import { createGoal, getGoals } from "../controllers/goalController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// AI-generated savings plan
router.post("/budget-plan", protect, createGoal);

// Get all goals
router.get("/goals", protect, getGoals);

export default router;
