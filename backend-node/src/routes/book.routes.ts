import { Router } from "express";
import { createBook, getBook } from "../controllers/book.controller.ts";

const router = Router();

router.post("/", createBook);
router.get("/:id", getBook);

export default router;