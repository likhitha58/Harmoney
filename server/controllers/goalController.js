import Goal from '../models/Goal.js';

// Add a new goal
export const addGoal = async (req, res) => {
  try {
    const { goalName, goalType, targetAmount, targetDate,
            income, expenses, savings, frequency, startDate } = req.body;

    // Here, req.user.id would come from middleware after JWT auth
    const userId = req.user ? req.user.id : null; // temporary fallback

    const goal = new Goal({
      user: userId,
      goalName,
      goalType,
      targetAmount,
      targetDate,
      income,
      expenses,
      savings,
      frequency,
      startDate,
    });

    const savedGoal = await goal.save();
    res.status(201).json(savedGoal);
  } catch (error) {
    console.error('Error adding goal:', error);
    res.status(500).json({ message: 'Failed to add goal', error });
  }
};

// Get all goals for a user
export const getGoals = async (req, res) => {
  try {
    const userId = req.user ? req.user.id : null; // temporary fallback
    const goals = await Goal.find({ user: userId });
    res.json(goals);
  } catch (error) {
    console.error('Error fetching goals:', error);
    res.status(500).json({ message: 'Failed to fetch goals', error });
  }
};

// Get single goal by ID
export const getGoalById = async (req, res) => {
  try {
    const goal = await Goal.findById(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.json(goal);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch goal', error });
  }
};

// Update a goal
export const updateGoal = async (req, res) => {
  try {
    const updatedGoal = await Goal.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedGoal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.json(updatedGoal);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update goal', error });
  }
};

// Delete a goal
export const deleteGoal = async (req, res) => {
  try {
    const goal = await Goal.findByIdAndDelete(req.params.id);
    if (!goal) {
      return res.status(404).json({ message: 'Goal not found' });
    }
    res.json({ message: 'Goal deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Failed to delete goal', error });
  }
};