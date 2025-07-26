import mongoose from "mongoose";

const savingsPlanSchema = new mongoose.Schema({
  month: Number,
  amount: Number,
});

const goalSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    title: { type: String, required: true },
    targetAmount: Number,
    currentSavings: Number,
    monthlyIncome: Number,
    monthlyExpenses: Number,
    months: Number,
    savingsPlan: [savingsPlanSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Goal", goalSchema);
