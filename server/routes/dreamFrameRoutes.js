import express from "express";
import fetch from "node-fetch";
import { protect } from "../middleware/authMiddleware.js";
import {generateDreamImage} from '../controllers/dreamFrameController.js';
import Goal from "../models/goalModel.js";

const router = express.Router();

router.post("/generate", protect, generateDreamImage);

export default router;
