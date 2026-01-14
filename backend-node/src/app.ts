import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"


const app = express()

app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true // Allow cookies to be sent with requests
}))

// common middleware
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ encoded: true, limit: '16kb' })) 
app.use(express.static('public')) 
app.use(cookieParser())


app.get("/", (req, res) => {
    res.send("API is running...")
})

export { app }