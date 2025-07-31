import Goal from "../models/goalModel.js";
import { getSavingsPlanFromAI } from "../services/aiService.js";
import { sendEmail } from "../utils/emailService.js";

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

    // Email Notification - Goal Creation
    const userEmail = req.user.email;
    console.log("Sending email to:", req.user.email);
    await sendEmail(
      userEmail,
      "Your new goal has been created!",
      `
        <h2>Goal Created Successfully</h2>
        <p><strong>Goal:</strong> ${goal.title}</p>
        <p>Target Amount: ₹${goal.targetAmount}</p>
        <p>Good luck achieving your goal!</p>
      `
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

    // Prepare email details
    const newAmount = updatedGoal.currentSavings;
    const amountLeft = Math.max(updatedGoal.targetAmount - newAmount, 0);
    const monthsLeft = Math.max(
      Math.ceil(amountLeft / ((updatedGoal.targetAmount || 1) / 12)),
      0
    );

    const userEmail = req.user.email;

    if (updatedGoal.completed) {
      // Email Notification - Goal Completion
      await sendEmail(
        userEmail,
        "Congratulations! Goal Achieved 🎉",
        `
          <h2>Congratulations!</h2>
          <p>You have successfully achieved your goal: <strong>${updatedGoal.title}</strong>.</p>
          <p>Target Amount: ₹${updatedGoal.targetAmount}</p>
          <p>Well done on reaching your goal!</p>
        `
      );
    } else {
      // Email Notification - Goal Updated
      await sendEmail(
        userEmail,
        "Goal Updated",
        `
          <h2>Your Goal Has Been Updated</h2>
          <p><strong>Goal:</strong> ${updatedGoal.title}</p>
          <p>Amount Updated: ₹${oldAmount} → ₹${newAmount}</p>
          <p>Amount Left: ₹${amountLeft}</p>
          <p>Estimated Months Left: ${monthsLeft}</p>
        `
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
