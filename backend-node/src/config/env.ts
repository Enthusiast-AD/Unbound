import dotenv from "dotenv"
dotenv.config({
    path: "./.env"
})
import { z } from "zod";

const envSchema = z.object({
    PORT: z.string().transform((val) => parseInt(val, 10)).default("8000"),
    MONGODB_URI: z.string().default("mongodb://localhost:27017"),
    REDIS_HOST: z.string().default("localhost"),
    REDIS_PORT: z.string().transform((val) => parseInt(val, 10)).default("6379"),
    REDIS_PASSWORD: z.string().default(""),
    CLERK_PUBLISHABLE_KEY: z.string().default(""),
    CLERK_SECRET_KEY: z.string().default(""),
    UPLOADTHING_TOKEN: z.string().default(""),
    PYTHON_BACKEND_URL: z.string().default("http://localhost:8001"),
    CORS_ORIGIN: z.string().default("http://localhost:3000"),
});

const env = envSchema.parse(process.env);

export default env;