import express from "express"
import { uploadImageByLink } from "../controllers/hotelController.js"

const router = express.Router()

router.route("/upload-by-link").post(uploadImageByLink)


export default router