import express from "express";
import evaluateRoutes from "./src/routes/evaluate.routes.js";

const app = express();

app.use(express.json()); 
app.use("/api/evaluate", evaluateRoutes);

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
