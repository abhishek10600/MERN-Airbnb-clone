import User from "../models/UserModel.js"
import { createTokenCookie } from "../utils/createTokenCookie.js"
import jwt from "jsonwebtoken"

export const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body
    try {
        if (!name) {
            res.status(400).json({
                success: false,
                message: "Name is a required field."
            })
        }
        if (!email) {
            res.status(400).json({
                success: false,
                message: "Email is a required field."
            })
        }
        let user = await User.findOne({ email })
        if (user) {
            res.status(401).json({
                success: false,
                message: "User already exists!"
            })
        }
        user = await User.create({
            name,
            email,
            password
        })
        user.password = undefined
        res.status(201).json({
            success: true,
            message: "User created successfully",
            user
        })
    } catch (error) {
        console.log(error)
    }
}

export const loginUser = async (req, res, next) => {
    const { email, password } = req.body
    try {
        let user = await User.findOne({ email })
        if (!user) {
            res.status(404).json({
                success: false,
                message: "Invalid email or password!"
            })
        }
        const isPasswordCorrect = await user.isPasswordValidated(password)
        if (!isPasswordCorrect) {
            res.status(404).json({
                success: false,
                message: "Invalid email or password"
            })
        }
        createTokenCookie(res, user, 200, "Logged in successfully!")
    } catch (error) {
        console.log(error)
    }
}

export const getLoggedInUserDetails = async (req, res, next) => {
    try {
        let user = {}
        const token = req.cookies.token || req.header("Authorization")?.replace("Bearer ", "")
        if (!token) {
            res.status(404).json({
                success: false,
                message: "Token not found or invalid token"
            })
        }
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decodedToken.id)
        user = req.user
        user.password = undefined
        res.status(200).json({
            success: true,
            user
        })
    } catch (error) {
        console.log(error)
    }
}