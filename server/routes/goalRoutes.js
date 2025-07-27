import express from "express";
import Goal from "../models/goalModel.js";
import { createGoal, getGoals } from "../controllers/goalController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Create a goal with a budget plan
router.post("/goals/budget-plan", protect, createGoal);

// Get all user goals
router.get("/goals", protect, getGoals);

// Get only active goals
router.get("/goals/active", protect, async (req, res) => {
  try {
    const goals = await Goal.find({
      userId: req.user.id, // correct field
      // Remove status filter for now or make it optional
    });
    res.json(goals);
  } catch (error) {
    console.error("Error in /goals/active", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
