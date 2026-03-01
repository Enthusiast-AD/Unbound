import type { Request, Response } from "express";
import Book from "../models/book.ts";
import { addPdfJob } from "../services/queue.service.ts";
import mongoose from "mongoose";

// Get all books for the logged in user
export const getUserBooks = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user._id;
    const books = await Book.find({ userId }).sort({ createdAt: -1 });
    res.status(200).json(books);
  } catch (error) {
    console.error("Get User Books Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const createBook = async (req: Request, res: Response) => {
  try {
    // 1. Get data from Frontend 
    const title = req.body.title;
    
    // Connect book to actual logged in user
    const userId = (req as any).user._id;

    if (!title || !req.file) {
      return res.status(400).json({ message: "Title and File are required" });
    }

    // Since we saved it to public/uploads, expose it over our API
    // Using 127.0.0.1 is safer for Python resolving it locally
    const fileUrl = `http://127.0.0.1:${process.env.PORT || 8000}/uploads/${req.file.filename}`;

    // 2. Save to MongoDB
    const newBook = await Book.create({
      title,
      fileUrl,
      userId,
      processingStatus: "pending", // Default status
    });

    // 3. Trigger the Python Worker (Add to Queue)
    try {
      await addPdfJob(newBook._id.toString(), fileUrl);
    } catch (queueError) {
      console.warn("Queue error (Redis might be down), proceeding with book creation:", queueError);
    }

    res.status(201).json({ 
      message: "Book created & processing started", 
      bookId: newBook._id 
    });

  } catch (error) {
    console.error("Create Book Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Get Book by ID with full details
export const getBook = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    
    const book = await Book.findById(id);

    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    // Return everything (Title, Structure, Content, Status)
    res.status(200).json(book);

  } catch (error) {
    console.error("Get Book Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};