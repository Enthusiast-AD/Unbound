import mongoose from "mongoose";
import { DB_NAME } from "../constants.ts"
import process from "process";

const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected: ${connectionInstance.connection.host}`);
    } catch (error: any) {
        console.error(`MongoDB connection error: ${error.message}`);
        process.exit(1);
    }
}

export default connectDB;