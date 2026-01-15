import { z } from "zod";


const envSchema = z.object({
    PORT: z.string().transform((val) => parseInt(val, 10)).default("8000"),
    MONGODB_URI: z.string().default("mongodb://localhost:27017"),
    JWT_SECRET: z.string().default("your_jwt_secret_key"),
    JWT_EXPIRES_IN: z.string().default("1d"),
    CORS_ORIGIN: z.string().default("http://localhost:3000"),
});

const env = envSchema.parse(process.env);

export default env;