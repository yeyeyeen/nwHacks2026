export async function evaluateWithGemini({ transcript, role, level }) {
  const API_KEY = process.env.GEMINI_API_KEY;
  console.log("Evaluating with Gemini");
  console.log("API_KEY:", API_KEY);
  if (!API_KEY) {
    console.warn("GEMINI_API_KEY is not set, using mock evaluation");
    return getMockEvaluation();
  }

  const prompt = buildEvaluationPrompt({ transcript, role, level });

  try {
    // Try v1 API with gemini-2.0-flash (latest model)
    console.log("CALLING GEMINI API");
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Gemini API Error:", data);
      console.warn("Gemini API unavailable, using mock evaluation");
      return getMockEvaluation();
    }

    const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!text) {
      console.error("Gemini response:", JSON.stringify(data, null, 2));
      console.warn("No response from Gemini, using mock evaluation");
      return getMockEvaluation();
    }

    try {
      // Extract JSON object from the text (handles markdown formatting)
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error("No JSON object found in response");
      }
      return JSON.parse(jsonMatch[0]);
    } catch (e) {
      console.error("Raw Gemini output:", text);
      console.warn("Invalid JSON from Gemini, using mock evaluation");
      return getMockEvaluation();
    }
  } catch (error) {
    console.error("Gemini API error:", error);
    console.warn("Using mock evaluation as fallback");
    return getMockEvaluation();
  }
}

function getMockEvaluation() {
  return {
    hire_probability: 0.72,
    strengths: [
      "Good communication skills",
      "Problem-solving ability",
      "Technical knowledge"
    ],
    weaknesses: [
      "Could improve depth in specific areas",
      "More real-world project experience would be beneficial"
    ],
    final_verdict: "Strong candidate with good potential. Recommend for further discussion."
  };
}

export function buildEvaluationPrompt({ transcript, role, level }) {
  return `
You are a senior interviewer at a top tech company.
Evaluate conservatively.

Transcript:
"""
${transcript}
"""

Role: ${role || "Software Engineer"}
Level: ${level || "New Grad"}

Return ONLY valid JSON:
{
  "hire_probability": number,
  "strengths": string[],
  "weaknesses": string[],
  "final_verdict": string
}
`;
}
