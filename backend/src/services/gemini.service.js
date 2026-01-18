const API_KEY = process.env.GEMINI_API_KEY;

export async function evaluateWithGemini({ transcript, role, level }) {
  const prompt = buildEvaluationPrompt({ transcript, role, level });

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    }
  );

  const data = await response.json();
  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    throw new Error("No response from Gemini");
  }

  try {
    return JSON.parse(text);
  } catch (e) {
    console.error("Raw Gemini output:", text);
    throw new Error("Invalid JSON from Gemini");
  }

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
