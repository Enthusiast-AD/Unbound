import dotenv from "dotenv"
import { app }from "./app.ts"
import connectDB from "./db/index.ts"


dotenv.config({
    path: "./.env"
})

const PORT = process.env.PORT || 8000

// connect to database
connectDB()
.then(() => {
    // start server
    app.listen(PORT, () => {
        console.log(`Server is running on port http://127.0.0.1:${PORT}`);
    })
})
.catch((error) => {
    console.error("Failed to connect to database", error);
})