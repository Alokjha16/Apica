import User from "../models/user.model.js";
import fetch from "node-fetch";

export const getUserRecommendation = async (req, res) => {
  try {
    const userId = req.params.id;

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // 🔹 Create structured prompt
    const prompt = `
You are a senior banking cross-sell AI agent.

Analyze the customer profile below and recommend exactly 3 most relevant banking products.

Customer Profile:
${JSON.stringify(user, null, 2)}

Rules:
- Recommend from: Credit Card, Personal Loan, Home Loan, Insurance, Investment Plan, Child Education Plan, Savings Upgrade
- Consider age, income, balance, transaction frequency, kids, marital status.
- Give short explanation (max 25 words each).
- Return in this format:

1. Product Name - Reason
2. Product Name - Reason
3. Product Name - Reason

Return ONLY the 3 recommendations.
`;

    const apiKey = process.env.GEMINI_API_KEY;
    const modelName = "models/gemini-2.5-flash";

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/${modelName}:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            temperature: 0.7,
            maxOutputTokens: 300,
          },
        }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(errorText);
    }

    const data = await response.json();

    const recommendation =
      data.candidates?.[0]?.content?.parts?.[0]?.text || "";

    res.status(200).json({
      success: true,
      recommendation,
    });
  } catch (error) {
    console.error("Recommendation error:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
