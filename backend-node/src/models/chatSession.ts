import mongoose,{Schema} from "mongoose";

const ChatSessionSchema = new Schema({
  userId: { 
    type: Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  bookId: { 
    type: Schema.Types.ObjectId, 
    ref: 'Book', 
    required: true 
  },
  
  // A title for    the sidebar history (e.g., "Understanding Recursion")
  summary: { type: String, default: "New Conversation" },
  
  lastMessageAt: { type: Date, default: Date.now }
}, { timestamps: true });

// Index for showing "My Chats for this Book" quickly
ChatSessionSchema.index({ userId: 1, bookId: 1 });

export default mongoose.model('ChatSession', ChatSessionSchema);