import express from "express"
import { uploadImageByLink, uploadImage, addHotel } from "../controllers/hotelController.js"
import photosMiddleware from "../middlewares/PhotosMiddleware.js"
import { isLoggedIn } from "../middlewares/UserMiddleware.js"

const router = express.Router()

router.route("/upload-by-link").post(uploadImageByLink)
router.route("/upload").post(photosMiddleware.array("photos", 100), uploadImage)
router.route("/add").post(isLoggedIn, addHotel)


export default router