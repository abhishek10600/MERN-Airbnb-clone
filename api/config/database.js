import mongoose from "mongoose"

const connectToDatabase = () => {
    mongoose.connect(process.env.MONGO_URI).
        then(
            console.log("Connected to database successfully")
        ).catch(error => {
            console.log("Connection to database failed!")
            console.log(error)
            process.exit(1)
        })
}

export default connectToDatabase