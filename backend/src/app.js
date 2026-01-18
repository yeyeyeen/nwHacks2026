// src/app.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import interviewRoutes from "./routes/interview.routes.js";

dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/interview", interviewRoutes);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    error: "Something went wrong",
    details: err.message
  });
});

export default app; // 👈 THIS IS CRITICAL
