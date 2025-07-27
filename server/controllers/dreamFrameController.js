import fetch from "node-fetch";
import FormData from "form-data";
import Goal from "../models/goalModel.js";

export const generateDreamImage = async (req, res) => {
  const { prompt, goalId } = req.body;
  const apiKey = process.env.STABILITY_API_KEY;

  try {
    const formData = new FormData();
    formData.append("prompt", prompt);
    formData.append("output_format", "png");
    formData.append("aspect_ratio", "1:1");

    const response = await fetch(
      "https://api.stability.ai/v2beta/stable-image/generate/core",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${apiKey}`,
          Accept: "application/json", // IMPORTANT
        },
        body: formData,
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Stability API error:", data);
      return res.status(500).json({ message: "Image generation failed" });
    }

    // The API returns base64-encoded image data in `data.image`
    const imageBase64 = `data:image/png;base64,${data.image}`;

    // Save to DB if a goalId is provided
    if (goalId) {
      const goal = await Goal.findOne({ _id: goalId, userId: req.user.id });
      if (goal) {
        goal.dreamImage = imageBase64;
        await goal.save();
      }
    }

    res.json({ imageUrl: imageBase64 });
  } catch (error) {
    console.error("Stability AI error:", error);
    res.status(500).json({ message: "Image generation failed" });
  }
};
