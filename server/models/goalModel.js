import mongoose from "mongoose";

const savingsPlanSchema = new mongoose.Schema({
  month: Number,
  amount: Number,
  allocation: String
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
      default: "Balanced",
    },
    savingsPlan: [savingsPlanSchema],
    dreamImage: { type: String },
    completed: { type: Boolean, default: false },
    status: { type: String, default: "active" },
  },
  { timestamps: true }
);

const Goal = mongoose.model("Goal", goalSchema);

export default Goal;
