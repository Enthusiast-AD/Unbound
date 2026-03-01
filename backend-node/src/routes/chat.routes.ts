import { Router } from "express";
import { getChatHistory, sendMessage } from "../controllers/chat.controller.ts";
import { protect } from "../middlewares/auth.middleware.ts";

const router = Router();

// Apply protect middleware to all chat routes
router.use(protect as any);

router.get("/:bookId", getChatHistory);
router.post("/:bookId", sendMessage);

export default router;
