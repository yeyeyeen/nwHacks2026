import express from "express";
import { evaluateInterview } from "../controllers/evaluate.controller.js";

const router = express.Router();

router.post("/", evaluateInterview);

export default router;
