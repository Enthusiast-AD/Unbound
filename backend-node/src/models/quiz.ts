import mongoose, {Schema} from 'mongoose';

const QuizSchema = new Schema({
  bookId: { type: Schema.Types.ObjectId, ref: 'Book', required: true },
  chapterSlug: { type: String, required: true }, // Link to specific chapter
  userId: { type: Schema.Types.ObjectId, ref: 'User' },
  
  questions: [{
    questionText: String,
    options: [String], // Array of 4 strings
    correctOptionIndex: Number, // 0-3
    explanation: String // Why is this the correct answer?
  }],
  
  userScore: Number, // Optional: if they already took it
  
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Quiz', QuizSchema);