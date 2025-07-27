import Goal from "../models/goalModel.js";
import { getSavingsPlanFromAI } from "../services/aiService.js";

// POST /api/budget-plan
export const createGoal = async (req, res) => {
  try {
    const {
      title,
      targetAmount,
      currentSavings,
      monthlyIncome,
      monthlyExpenses,
      months,
      riskProfile,
      ageGroup,
    } = req.body;

    // Call AI to generate a savings plan
    const savingsPlan = await getSavingsPlanFromAI({
      targetAmount,
      currentSavings,
      monthlyIncome,
      monthlyExpenses,
      months,
      riskProfile,
      ageGroup,
    });

    const goal = new Goal({
      userId: req.user.id,
      title: title || "Personal Savings Plan",
      targetAmount,
      currentSavings,
      monthlyIncome,
      monthlyExpenses,
      months,
      riskProfile,
      ageGroup,
      savingsPlan,
    });

    await goal.save();

    return res.status(201).json(goal);
  } catch (error) {
    console.error("Error creating goal:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// GET /api/goals
export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.id });
    res.json(goals);
  } catch (error) {
    console.error("Error fetching goals:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
