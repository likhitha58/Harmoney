// server/services/aiService.js
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getSavingsPlanFromAI = async (goalData) => {
  const prompt = `
    Based on the following data, return only valid JSON of a savings plan.

    Target amount: ${goalData.targetAmount}
    Current savings: ${goalData.currentSavings}
    Monthly income: ${goalData.monthlyIncome}
    Monthly expenses: ${goalData.monthlyExpenses}
    Timeframe (months): ${goalData.months}

    Format:
    [
      {"month":1, "amount":5000},
      {"month":2, "amount":4500}
    ]
  `;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  // Extract JSON even if there’s extra text
  const jsonMatch = text.match(/\[[\s\S]*\]/);
  if (!jsonMatch) {
    console.error("AI did not return JSON:", text);
    return [];
  }

  try {
    return JSON.parse(jsonMatch[0]);
  } catch (e) {
    console.error("JSON parse failed:", text);
    return [];
  }
};

