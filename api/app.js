import dotenv from "dotenv"
import express from "express"
import CORS from "cors"
import userRouter from "./routes/userRouter.js"

const app = express()

app.use(express.json())
app.use(CORS({
    origin: "http://localhost:5173",
    credentials: true,
}))

app.get("/testing", (req, res) => {
    res.status(200).json({
        success: true,
        message: "Api is working!"
    })
})

app.use("/api/v1/users", userRouter)


export default app
