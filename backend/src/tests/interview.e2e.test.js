import request from "supertest";
import app from "../app.js";

describe("Interview → Evaluation flow", () => {
  let sessionId;
  let questionId;

  it("starts interview", async () => {
    const res = await request(app)
      .post("/api/interview/start")
      .send({ userId: "test-user" });

    sessionId = res.body.sessionId;
    expect(sessionId).toBeDefined();
  });

  it("gets question", async () => {
    const res = await request(app)
      .get(`/api/interview/${sessionId}/question`);

    questionId = res.body.questionId;
    expect(questionId).toBeDefined();
  });

  it("submits answer", async () => {
    const res = await request(app)
      .post(`/api/interview/${sessionId}/answer`)
      .send({
        questionId,
        answer: "I like backend engineering and APIs."
      });

    expect(res.body.success).toBe(true);
  });

  it("ends interview and evaluates", async () => {
    const res = await request(app)
      .post(`/api/interview/${sessionId}/end`);

    expect(res.body.evaluation).toBeDefined();
    expect(res.body.evaluation.hire_probability).toBeDefined();
  });
});
