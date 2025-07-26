// server/controllers/goalController.js
import Goal from "../models/goalModel.js";  // Adjust the path if different
import { getSavingsPlanFromAI } from "../services/aiService.js";

// Create Goal with AI-generated savings plan
export const createGoal = async (req, res) => {
  try {
    const { title, targetAmount, currentSavings, monthlyIncome, monthlyExpenses, months } = req.body;

    // Get plan from AI
    const savingsPlan = await getSavingsPlanFromAI({
      targetAmount,
      currentSavings,
      monthlyIncome,
      monthlyExpenses,
      months,
    });

    const goal = new Goal({
      userId: req.user.id,
      title,
      targetAmount,
      currentSavings,
      monthlyIncome,
      monthlyExpenses,
      months,
      savingsPlan, // Save the AI-generated plan
    });

    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get all goals of a user
export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.id });
    res.json(goals);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
};
