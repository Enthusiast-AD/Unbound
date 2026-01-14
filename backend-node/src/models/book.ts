import mongoose, { Schema } from 'mongoose';

// Define the Chapter Schema separately to allow recursion
const ChapterSchema = new Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true }, // For URL: /book/123/intro-to-variables
  pageStart: { type: Number }, // Which page in the PDF this starts
  content: { type: String }, // Optional: Summary or small text snippet
});

// The Magic: Add the recursive 'children' field
ChapterSchema.add({
  children: [ChapterSchema]
});

const BookSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true,
    index: true 
  },
  
  title: { type: String, required: true },
  
  // S3 URL where the raw PDF is stored
  fileUrl: { type: String, required: true },
  
  // "Pending" -> "Processing" -> "Completed" (or "Failed")
  processingStatus: {
    type: String,
    enum: ['pending', 'processing', 'completed', 'failed'],
    default: 'pending'
  },
  
  // The recursive tree of chapters
  structure: [ChapterSchema],
  
  pageCount: Number,
  isPublic: { type: Boolean, default: false }, // For "Community" feature
  
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Book', BookSchema);