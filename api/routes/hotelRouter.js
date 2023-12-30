import express from "express"
import { uploadImageByLink, uploadImage } from "../controllers/hotelController.js"
import photosMiddleware from "../middlewares/PhotosMiddleware.js"

const router = express.Router()

router.route("/upload-by-link").post(uploadImageByLink)
router.route("/upload").post(photosMiddleware.array("photos", 100), uploadImage)


export default router