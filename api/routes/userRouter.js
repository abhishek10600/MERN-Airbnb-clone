import express from "express"
import { registerUser, loginUser, getLoggedInUserDetails } from "../controllers/userController.js"


const router = express.Router()

router.route("/register").post(registerUser)
router.route("/login").post(loginUser)
router.route("/getLoggedInUserDetails").get(getLoggedInUserDetails)

export default router