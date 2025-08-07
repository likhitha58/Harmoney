import Goal from "../models/goalModel.js";
import User from "../models/userModel.js";
import { getSavingsPlanFromAI } from "../services/aiService.js";
import { sendEmail } from "../utils/emailService.js";
import {
  goalCreatedTemplate,
  goalUpdatedTemplate,
  goalCompletedTemplate,
} from "../utils/emailTemplates.js";

// CREATE GOAL
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
      riskProfile, // from frontend
    } = req.body;

    const savingsPlan = await getSavingsPlanFromAI({
      title,
      description,
      targetAmount,
      currentSavings,
      monthlyIncome,
      monthlyExpenses,
      months,
      riskProfile,
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

    // Fetch user's name & email
    const user = await User.findById(req.user.id).select("name email");
    const userName = user?.name || "User";

    // Email Notification - Goal Creation
    await sendEmail(
      user.email,
      "Your new goal has been created!",
      goalCreatedTemplate(goal, userName)
    );


    res.status(201).json(goal);
  } catch (err) {
    console.error("Error creating goal:", err);
    res.status(500).json({ message: "Server Error" });
  }
};

// GET ACTIVE GOALS
export const getGoals = async (req, res) => {
  try {
    const goals = await Goal.find({
      userId: req.user.id,
      completed: false,
      status: "active",
    });
    res.json(goals);
  } catch (err) {
    console.error("Error fetching goals:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// GET COMPLETED GOALS
export const getAchievedGoals = async (req, res) => {
  try {
    const achievedGoals = await Goal.find({
      userId: req.user.id,
      completed: true,
    });
    res.json(achievedGoals);
  } catch (err) {
    console.error("Error fetching achieved goals:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// UPDATE GOAL
export const updateGoal = async (req, res) => {
  try {
    const goal = await Goal.findOne({ _id: req.params.id, userId: req.user.id });
    if (!goal) {
      return res.status(404).json({ message: "Goal not found" });
    }

    const oldAmount = goal.currentSavings;

    // Update fields
    goal.title = req.body.title || goal.title;
    goal.description = req.body.description || goal.description;
    goal.currentSavings =
      req.body.currentSavings !== undefined
        ? req.body.currentSavings
        : goal.currentSavings;

    // Check for completion
    if (goal.currentSavings >= goal.targetAmount) {
      goal.completed = true;
      goal.status = "completed";
    }

    const updatedGoal = await goal.save();

    // Fetch user's name & email
    const user = await User.findById(req.user.id).select("name email");
    const userName = user?.name || "User";

    // Prepare email details
    const newAmount = updatedGoal.currentSavings;
    const amountLeft = Math.max(updatedGoal.targetAmount - newAmount, 0);
    const monthsLeft = Math.max(
      Math.ceil(amountLeft / ((updatedGoal.targetAmount || 1) / 12)),
      0
    );

    if (updatedGoal.completed) {
      // Goal Completion Email
      await sendEmail(
        user.email,
        "Congratulations! Goal Achieved 🎉",
        goalCompletedTemplate(updatedGoal, userName)
      );

    } else {
      // Goal Updated Email
      await sendEmail(
        user.email,
        "Goal Updated",
        goalUpdatedTemplate(updatedGoal, oldAmount, userName)
      );

    }

    res.json(updatedGoal);
  } catch (err) {
    console.error("Error updating goal:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// DELETE GOAL
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
