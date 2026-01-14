import mongoose, {Schema} from 'mongoose';


const UserSchema = new Schema({
  clerkId: { 
    type: String, 
    required: true, 
    unique: true,
    index: true // Fast lookups by Clerk ID
  },
  email: { 
    type: String, 
    required: true,
    unique: true 
  },
  firstName: String,
  lastName: String,
  
  // For monetization later (Free vs Pro)
  subscriptionTier: {
    type: String,
    enum: ['free', 'pro', 'admin'],
    default: 'free'
  },
  
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('User', UserSchema);