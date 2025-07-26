import mongoose from "mongoose";

const GoalSchema = new mongoose.Schema({
  goalName: { type: String, required: true },
  targetAmount: { type: Number, required: true },
  currentSavings: { type: Number, default: 0 },
  targetDate: { type: String, required: true },
  savingsPlan: { type: String }, // The AI-generated plan
});

const Goal = mongoose.model("Goal", GoalSchema);
export default Goal;