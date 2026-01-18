import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import evaluateRoutes from "./routes/evaluate.routes.js";
import interviewRoutes from "./routes/interview.routes.js";

// Load environment variables
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/api/evaluate", evaluateRoutes);
app.use("/api/interview", interviewRoutes);

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({ status: "ok", message: "Server is running" });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ 
    error: "Something went wrong!", 
    details: err.message 
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
