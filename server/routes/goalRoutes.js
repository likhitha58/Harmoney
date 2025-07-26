import express from "express";
import { createGoal, getGoals } from "../controllers/goalController.js";
import { protect } from "../middleware/authMiddleware.js"; // authentication middleware

const router = express.Router();

// Protected routes
router.post("/", protect, createGoal);
router.get("/", protect, getGoals);

export default router;
