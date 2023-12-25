import mongoose from "mongoose"

const placeSchema = new mongoose.Schema(
    {
        owner: {
            type: mongoose.SchemaTypes.ObjectId,
            ref: "User"
        },
        title: {
            type: String,
        },
        address: {
            type: String,
        },
        photos: [
            {
                type: String
            }
        ],
        description: {
            type: String,
            required: [true,]
        },
        perks: [
            {
                type: String
            }
        ],
        extraInfo: {
            type: String
        },
        checkIn:
        {
            type: Number
        },
        checkOut:
        {
            type: Number
        },
        maxGuests:
        {
            type: Number
        }
    },
    {
        timestamps: true
    }
)

const Place = mongoose.model("Place", placeSchema)

export default Place