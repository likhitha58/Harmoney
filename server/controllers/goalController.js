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
       status: "active",
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

export const getActiveGoals = async (req, res) => {
  try {
    const goals = await Goal.find({
      userId: req.user.id,
      status: "active", // filter only active goals
    });
    res.json(goals);
  } catch (error) {
    console.error("Error fetching active goals:", error);
    res.status(500).json({ message: "Server error" });
  }
};


export const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({ _id: req.params.id, userId: req.user.id });
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    // Update fields
    goal.title = req.body.title || goal.title;
    goal.description = req.body.description || goal.description;
    goal.currentSavings =
      req.body.currentSavings !== undefined
        ? req.body.currentSavings
        : goal.currentSavings;

    const updatedGoal = await goal.save();
    res.json(updatedGoal);
  } catch (err) {
    console.error("Error updating goal:", err);
    res.status(500).json({ message: "Server error" });
  }
};
