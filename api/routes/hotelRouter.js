import express from "express"
import { uploadImageByLink, uploadImage, addHotel, getAllHotels, getAllUserHotels, getHotelById, updateHotel } from "../controllers/hotelController.js"
import photosMiddleware from "../middlewares/PhotosMiddleware.js"
import { isLoggedIn } from "../middlewares/UserMiddleware.js"

const router = express.Router()

router.route("/upload-by-link").post(uploadImageByLink)
router.route("/upload").post(photosMiddleware.array("photos", 100), uploadImage)
router.route("/add").post(isLoggedIn, addHotel)
router.route("/update/:hotelId").put(isLoggedIn, updateHotel)
router.route("/allHotels").get(getAllHotels)
router.route("/allUserHotels").get(isLoggedIn, getAllUserHotels)
router.route("/getHotelById/:hotelId").get(getHotelById)


export default router