import { GoogleGenerativeAI } from "@google/generative-ai";
import Chat from "../models/chatModel.js";
import Goal from "../models/goalModel.js";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export const chatWithAI = async (req, res) => {
  try {
    const { question } = req.body;
    const userId = req.user.id;

    // 1. Load user’s recent chat history (last 10 messages)
    const chat = await Chat.findOne({ userId }).sort({ createdAt: -1 });
    const pastMessages = chat ? chat.messages.slice(-10) : [];

    // 2. Load user's active goals to include in context
    const goals = await Goal.find({ userId });
    const goalsSummary = goals.length
      ? goals.map((g, i) =>
          `${i + 1}. ${g.title} – Target ₹${g.targetAmount} in ${g.months} months`
        ).join("\n")
      : "No active goals yet.";

    // 3. Build context
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
    const context = `
You are BudgetBuddy, a friendly financial assistant.

Here are the user's current goals:
${goalsSummary}

Chat history (last messages):
${pastMessages.map(m => `${m.role === "user" ? "User" : "Bot"}: ${m.content}`).join("\n")}

Now respond simply to the new question:
${question}
`;

    const result = await model.generateContent(context);
    const answer = result.response.text();

    // 4. Save new messages
    let userChat = chat;
    if (!userChat) {
      userChat = new Chat({ userId, messages: [] });
    }
    userChat.messages.push({ role: "user", content: question });
    userChat.messages.push({ role: "bot", content: answer });
    await userChat.save();

    // 5. Respond to frontend
    res.json({ answer });
  } catch (err) {
    console.error("Gemini chat error:", err);
    res.status(500).json({ message: "Error generating response" });
  }
};
