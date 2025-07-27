import Goal from "../models/goalModel.js";
import { getSavingsPlanFromAI } from "../services/aiService.js";

export const createGoal = async (req, res) => {
  try {
    const {
      title,
      description,
      targetAmount,
      currentSavings,
      monthlyIncome,
      monthlyExpenses,
      months,
      riskProfile, // from frontend, mapped to approach
    } = req.body;

    const savingsPlan = await getSavingsPlanFromAI({
      title,
      description,
      targetAmount,
      currentSavings,
      monthlyIncome,
      monthlyExpenses,
      months,
      riskProfile, // still called riskProfile in AI for simplicity
    });

    const goal = new Goal({
      userId: req.user.id,
      title: title || "Personal Savings Plan",
      description,
      targetAmount,
      currentSavings,
      monthlyIncome,
      monthlyExpenses,
      months,
      approach: riskProfile,
      savingsPlan,
    });

    await goal.save();
    res.status(201).json(goal);
  } catch (err) {
    console.error("Error creating goal:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({ userId: req.user.id });
    res.json(goals);
  } catch (err) {
    console.error("Error fetching goals:", err);
    res.status(500).json({ message: "Server Error" });
  }
};
