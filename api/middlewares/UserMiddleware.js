import jwt from "jsonwebtoken"
import User from "../models/UserModel.js"

export const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "")
        console.log(token)
        if (!token) {
            return res.status(404).json({
                success: false,
                message: "Please login to use this feature"
            })
        }
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id)
        next()
    } catch (error) {
        return next(new Error(error.message))
    }
}
