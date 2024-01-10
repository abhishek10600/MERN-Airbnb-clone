import mongoose from "mongoose"

const bookingSchema = new mongoose.Schema(
    {
        bookedBy: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User",
            required: true
        },
        place: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "Place",
            required: true
        },
        checkIn: {
            type: Date,
            required: true
        },
        checkOut: {
            type: Date,
            required: true
        },
        numberOfGuests: {
            type: Number,
            required: true
        },
        name: {
            type: String,
            required: true
        },
        mobile: {
            type: Number,
            required: true
        },
        price: {
            type: Number,
        }
    },
    {
        timestamps: true
    }
);

const BookingModel = mongoose.model("Booking", bookingSchema)

export default BookingModel;

