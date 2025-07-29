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

// Get only active (not completed) goals
export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({
      userId: req.user.id,
      $or: [
        { completed: false },
        { status: "active" }
      ]
    });
    res.json(goals);
  } catch (err) {
    console.error("Error fetching goals:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Get achieved (completed) goals
export const getAchievedGoals = async (req, res) => {
  try {
    const achievedGoals = await Goal.find({
      userId: req.user.id,
      completed: true,
    });
    res.json(achievedGoals);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

export const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({ _id: req.params.id, userId: req.user.id });
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    goal.title = req.body.title || goal.title;
    goal.description = req.body.description || goal.description;
    goal.currentSavings =
      req.body.currentSavings !== undefined
        ? req.body.currentSavings
        : goal.currentSavings;

    // If currentSavings >= targetAmount, mark as completed
    if (goal.currentSavings >= goal.targetAmount) {
      goal.completed = true;
      goal.status = "completed";  // Make sure to update the status
    }

    const updatedGoal = await goal.save();
    res.json(updatedGoal);
  } catch (err) {
    console.error("Error updating goal:", err);
    res.status(500).json({ message: "Server error" });
  }
};


// Delete goal by ID
export const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });

    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    res.json({ message: "Goal deleted successfully" });
  } catch (err) {
    console.error("Error deleting goal:", err);
    res.status(500).json({ message: "Server error" });
  }
};
