import { Router } from "express";
import { generateQuiz, submitQuiz } from "../controllers/quiz.controller.ts";
import { protect } from "../middlewares/auth.middleware.ts";

const router = Router();

// Apply protect middleware to all quiz routes
router.use(protect as any);

router.post("/generate", generateQuiz);
router.post("/submit", submitQuiz);

export default router;
