import dotenv from "dotenv"
dotenv.config()
import app from "./app.js"
import connectToDatabase from "./config/database.js"

connectToDatabase()

const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log(`App listening at port ${port}....`)
})