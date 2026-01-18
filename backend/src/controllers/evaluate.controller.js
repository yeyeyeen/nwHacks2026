import { evaluateWithGemini } from "../services/gemini.service.js";

export async function evaluateInterview(req, res) {
  try {
    const { transcript, role, level } = req.body;

    if (!transcript) {
      return res.status(400).json({ error: "Transcript is required" });
    }

    const result = await evaluateWithGemini({
      transcript,
      role,
      level
    });

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Evaluation failed" });
  }
}
