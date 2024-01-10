import dotenv from "dotenv"
import express from "express"
import CORS from "cors"
import path from "path"
import { fileURLToPath } from "url"
import userRouter from "./routes/userRouter.js"
import hotelRouter from "./routes/hotelRouter.js"
import bookingRouter from "./routes/bookingRouter.js"
import cookieParser from "cookie-parser"

const app = express()

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.use("/uploads", express.static(__dirname + "/uploads"))
app.use(express.json())
app.use(CORS({
    origin: "http://localhost:5173",
    credentials: true,
}))
app.use(cookieParser())

app.get("/testing", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Api is working!"
    })
})

app.use("/api/v1/users", userRouter)
app.use("/api/v1/hotels", hotelRouter)
app.use("/api/v1/bookings", bookingRouter)


export default app
