import type { Request, Response } from "express";
import ChatMessage from "../models/chatMessage.ts";
import ChatSession from "../models/chatSession.ts";
import Book from "../models/book.ts";

// Get Chat Session History
export const getChatHistory = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const userId = (req as any).user._id;

    let session = await ChatSession.findOne({ bookId, userId });

    if (!session) {
      return res.status(200).json([]);
    }

    const messages = await ChatMessage.find({ sessionId: session._id }).sort({ createdAt: 1 });
    
    // Transform to frontend format { role: "user" | "ai", text: string }
    const formattedMessages = messages.map(msg => ({
      role: msg.role === "assistant" ? "ai" : "user",
      text: msg.content
    }));

    res.status(200).json(formattedMessages);
  } catch (error) {
    console.error("Get Chat Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

// Send message to AI
export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { bookId } = req.params;
    const { message, mode, chapterSlug } = req.body;
    const userId = (req as any).user._id;

    if (!message) {
      return res.status(400).json({ message: "Message is required" });
    }

    let session = await ChatSession.findOne({ bookId, userId });
    if (!session) {
      session = await ChatSession.create({ userId, bookId });
    }

    // Save User Message
    await ChatMessage.create({
      sessionId: session._id,
      role: "user",
      content: message,
      mode: mode?.toLowerCase() || "beginner"
    });

    // =========================================================================
    // TODO: Send to Python Worker (FastAPI) for actual RAG here via Axios
    // For now, we mock the AI response so frontend completes the loop.
    // =========================================================================
    
    let aiResponseText = `This is a simulated ${mode} response answering your query regarding ${chapterSlug || 'this document'}. The Python backend should be wired here in phase 2!`;

    // Save AI Response
    const aiMessage = await ChatMessage.create({
      sessionId: session._id,
      role: "assistant",
      content: aiResponseText,
      mode: mode?.toLowerCase() || "beginner"
    });

    session.lastMessageAt = new Date();
    await session.save();

    res.status(200).json({
      role: "ai",
      text: aiMessage.content
    });
  } catch (error) {
    console.error("Send Message Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
