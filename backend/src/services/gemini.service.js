const API_KEY = process.env.GEMINI_API_KEY;

export async function evaluateWithGemini({ transcript, role, level }) {
  if (!API_KEY) {
    throw new Error("GEMINI_API_KEY is not set in environment variables");
  }

  const prompt = buildEvaluationPrompt({ transcript, role, level });

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
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
    throw new Error(`Gemini API Error: ${data?.error?.message || 'Unknown error'}`);
  }

  const text = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!text) {
    console.error("Gemini response:", JSON.stringify(data, null, 2));
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
