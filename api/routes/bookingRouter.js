import express from "express"
import { createBooking, getLoggedInUserBookings } from "../controllers/bookingController.js"
import { isLoggedIn } from "../middlewares/UserMiddleware.js"

const router = express.Router();

router.route("/newBooking").post(isLoggedIn, createBooking)
router.route("/all").get(isLoggedIn, getLoggedInUserBookings)


export default router;