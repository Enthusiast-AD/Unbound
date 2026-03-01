import { Router } from "express";
import { createBook, getBook, getUserBooks } from "../controllers/book.controller.ts";
import { protect } from "../middlewares/auth.middleware.ts";
import { uploadPdf } from "../middlewares/upload.middleware.ts";

const router = Router();

// Apply protect middleware to all book routes
router.use(protect as any);

router.get("/", getUserBooks);
router.post("/", uploadPdf.single("file"), createBook);
router.get("/:id", getBook);

export default router;