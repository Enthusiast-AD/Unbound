import mongoose, {Schema} from 'mongoose';

const ChatMessageSchema = new Schema({
  sessionId: { 
    type: Schema.Types.ObjectId, 
    ref: 'ChatSession', 
    required: true,
    index: true 
  },
  
  role: { 
    type: String, 
    enum: ['user', 'assistant'], 
    required: true 
  },
  
  content: { type: String, required: true },
  
  // For citations: Which chapters did the AI use to answer?
  sources: [{
    title: String,
    pageNumber: Number,
    slug: String
  }],
  
  // Which mode was used? (Beginner, Socratic, etc.)
  mode: { 
    type: String, 
    enum: ['beginner', 'advanced', 'socratic'],
    default: 'beginner'
  },
  
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('ChatMessage', ChatMessageSchema);