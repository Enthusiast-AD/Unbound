import type { Request, Response } from "express";
import Quiz from "../models/quiz.ts";
import Book from "../models/book.ts";

export const generateQuiz = async (req: Request, res: Response) => {
  try {
    const { bookId, chapterSlug } = req.body;
    const userId = (req as any).user._id;

    if (!bookId || !chapterSlug) {
      return res.status(400).json({ message: "bookId and chapterSlug are required" });
    }

    // See if user already generated a quiz for this specific chapter.
    let existingQuiz = await Quiz.findOne({ bookId, chapterSlug, userId });
    
    if (existingQuiz && !existingQuiz.userScore && typeof existingQuiz.userScore !== 'number') {
      // Return existing uncompleted quiz
      return res.status(200).json(existingQuiz);
    }

    // =========================================================================
    // TODO: Send request to Python AI Worker to generate quiz from Vector DB
    // =========================================================================
    
    // Mock the MCQ questions for now:
    const newQuestions = [
      {
        questionText: `What is the main topic discussing in ${chapterSlug}?`,
        options: ["Topic A", "Topic B", "Topic C", "None of the above"],
        correctOptionIndex: 0,
        explanation: "Based on the text, Topic A is the introductory subject."
      },
      {
        questionText: "How does the author define the core concept?",
        options: ["As a process", "As a stationary object", "As a calculation", "As an illusion"],
        correctOptionIndex: 0,
        explanation: "The text clearly defines the core concept as an ongoing process."
      }
    ];

    const quiz = await Quiz.create({
      bookId,
      chapterSlug,
      userId,
      questions: newQuestions,
    });

    res.status(201).json(quiz);

  } catch (error) {
    console.error("Generate Quiz Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};

export const submitQuiz = async (req: Request, res: Response) => {
  try {
    const { quizId, answers } = req.body; // answers: array of numbers representing indexes
    const userId = (req as any).user._id;

    const quiz = await Quiz.findOne({ _id: quizId, userId });

    if (!quiz) {
      return res.status(404).json({ message: "Quiz not found" });
    }

    let correctCount = 0;
    quiz.questions.forEach((q, idx) => {
      if (answers[idx] === q.correctOptionIndex) correctCount++;
    });

    const userScore = Math.round((correctCount / quiz.questions.length) * 100);

    quiz.userScore = userScore;
    await quiz.save();

    res.status(200).json({ score: userScore, total: quiz.questions.length, correct: correctCount });

  } catch (error) {
    console.error("Submit Quiz Error:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
