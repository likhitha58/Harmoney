import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const getSavingsPlanFromAI = async (goalData) => {
  const prompt = `
    You are a financial planning assistant. Based on the following data, create a JSON savings plan.
    
    Inputs:
    - Goal: ${goalData.title || "Unnamed Goal"}
    - Description: ${goalData.description || "No description provided"}
    - Target amount: ${goalData.targetAmount}
    - Current savings: ${goalData.currentSavings}
    - Monthly income: ${goalData.monthlyIncome}
    - Monthly expenses: ${goalData.monthlyExpenses}
    - Timeframe (months): ${goalData.months}
    - Preferred approach: ${goalData.riskProfile}

    Guidelines:
    1. Do NOT include any explanation or text. Output ONLY a JSON array.
    2. Make the plan progressive:
       - First few months: smaller savings
       - Increase gradually as habit forms
       - Ensure total savings roughly meet the target by the end.
    3. Include allocation suggestions for each month (e.g. "60% bank savings, 30% SIP, 10% emergency fund").
    4. Ensure amounts are realistic (never more than (income - expenses)).

    Format (JSON array only):
    [
      {"month":1, "amount":4000, "allocation":"60% bank savings, 30% SIP, 10% emergency"},
      {"month":2, "amount":4500, "allocation":"..."}
    ]
  `;

  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
  const result = await model.generateContent(prompt);
  const text = result.response.text().trim();

  // Extract JSON safely
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
