import type { Request, Response } from "express";
import Book from "../models/book.ts";
import { addPdfJob } from "../services/queue.service.ts";
import mongoose from "mongoose";

export const createBook = async (req: Request, res: Response) => {
  try {
    // 1. Get data from Frontend (UploadThing sends this)
    const { title, fileUrl } = req.body;
    
    // Generate a real random ObjectId for testing
    // Later, this will come from req.user._id (from Auth middleware)
    const userId = new mongoose.Types.ObjectId();

    if (!title || !fileUrl) {
      return res.status(400).json({ message: "Title and File URL are required" });
    }

    // 2. Save to MongoDB
    const newBook = await Book.create({
      title,
      fileUrl,
      userId,
      processingStatus: "pending", // Default status
    });

    // 3. Trigger the Python Worker (Add to Queue)
    await addPdfJob(newBook._id.toString(), fileUrl);

    res.status(201).json({ 
      message: "Book created & processing started", 
      bookId: newBook._id 
    });

  } catch (error) {
    console.error("Create Book Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};