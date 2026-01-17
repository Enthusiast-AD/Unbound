import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"
import env from "./config/env.ts"
import {createRouteHandler} from "uploadthing/express"
import {uploadRouter} from "./lib/uploadthing.ts"


const app = express()

app.use(cors({
    origin: env.CORS_ORIGIN,
    credentials: true // Allow cookies to be sent with requests
}))

// common middleware
app.use(express.json({ limit: '16kb' }))
app.use(express.urlencoded({ extended: true, limit: '16kb' })) 
app.use(express.static('public')) 
app.use(cookieParser())

app.use('/api/uploadthing', createRouteHandler({
    router: uploadRouter,
    config: {token: env.UPLOADTHING_TOKEN}
}))

app.get("/", (req, res) => {
    res.send("API is running...")
})

export { app }