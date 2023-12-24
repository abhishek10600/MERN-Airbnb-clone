import express from "express"
import { registerUser, loginUser, getLoggedInUserDetails, logout } from "../controllers/userController.js"
import { isLoggedIn } from "../middlewares/UserMiddleware.js"


const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/getLoggedInUserDetails").get(getLoggedInUserDetails)
router.route("/logout").get(isLoggedIn, logout)

export default router