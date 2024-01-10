import Booking from "../models/BookingModel.js";


export const createBooking = async (req, res) => {
    try {
        const { placeId, checkIn, checkOut, numberOfGuests, name, mobile, price } = req.body

        console.log({ placeId, checkIn, checkOut, numberOfGuests, name, mobile, price })
        const booking = await Booking.create({
            bookedBy: req.user._id,
            place: placeId,
            checkIn,
            checkOut,
            numberOfGuests,
            name,
            mobile,
            price
        })
        res.status(201).json({
            success: true,
            message: "Your booking is successfull.",
            bookingDetails: booking
        })

    } catch (error) {
        console.log(error.message);
    }
}

export const getLoggedInUserBookings = async (req, res) => {
    try {
        const userId = req.user._id
        const bookings = await Booking.find({ bookedBy: userId }).populate("place")
        res.status(200).json({
            success: true,
            bookings
        })
    } catch (error) {
        console.log(error.message)
    }
}