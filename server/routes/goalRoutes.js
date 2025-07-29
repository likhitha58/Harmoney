import express from "express";
import {
  createGoal,
  getGoals,
  updateGoal,
  getActiveGoals,
  deleteGoal
} from "../controllers/goalController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a goal with a budget plan
router.post("/goals/budget-plan", protect, createGoal);

// Get all user goals
router.get("/goals", protect, getGoals);

// Update a goal by ID
router.put("/goals/:id", protect, updateGoal);

// Get only active goals
router.get("/goals/active", protect, getActiveGoals);

//delete goal by id
router.delete("/goals/:id", protect, deleteGoal);

export default router;
