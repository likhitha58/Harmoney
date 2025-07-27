import mongoose from "mongoose";

// Subdocument schema for individual savings plan entries
const savingsPlanSchema = new mongoose.Schema({
  month: { type: Number, required: true },
  amount: { type: Number, required: true },
  allocation: { type: String }, // e.g., "50% savings, 30% mutual funds, 20% emergency"
});

// Main Goal schema
const goalSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    title: {
      type: String,
      default: "Personal Savings Plan",
    },
    targetAmount: { type: Number, required: true },
    currentSavings: { type: Number, default: 0 },
    monthlyIncome: { type: Number, required: true },
    monthlyExpenses: { type: Number, required: true },
    months: { type: Number, required: true },
    riskProfile: {
      type: String,
      enum: ["Conservative", "Balanced", "Aggressive"],
      default: "Balanced",
    },
    ageGroup: { type: String, default: "26-35" },
    savingsPlan: [savingsPlanSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Goal", goalSchema);
