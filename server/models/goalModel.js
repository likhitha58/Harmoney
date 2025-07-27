import mongoose from "mongoose";

const savingsPlanSchema = new mongoose.Schema({
  month: { type: Number, required: true },
  amount: { type: Number, required: true },
  allocation: { type: String },
});

const goalSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, default: "Personal Savings Plan" },
    description: { type: String },
    targetAmount: { type: Number, required: true },
    currentSavings: { type: Number, default: 0 },
    monthlyIncome: { type: Number, required: true },
    monthlyExpenses: { type: Number, required: true },
    months: { type: Number, required: true },
    approach: { 
      type: String, 
      enum: ["Safe & Steady", "Balanced", "Fast Track"], 
      default: "Balanced" 
    },
    savingsPlan: [savingsPlanSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Goal", goalSchema);
