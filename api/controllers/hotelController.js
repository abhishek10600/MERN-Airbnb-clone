import imageDownloader from "image-downloader"
import path from "path"
import { fileURLToPath } from "url"
import fs from "fs"
import Place from "../models/PlaceMode.js"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const imageUploadPath = __dirname.replace("api/controllers", "api/uploads/")

export const uploadImageByLink = async (req, res, next) => {
    const { link } = req.body
    const newName = "photo" + Date.now() + ".jpg"
    try {
        await imageDownloader.image({
            url: link,
            dest: imageUploadPath + newName
        })
        res.status(200).json({
            success: true,
            image: newName
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const uploadImage = async (req, res, next) => {
    let uploadedFiles = []
    for (let i = 0; i < req.files.length; i++) {
        const { path, originalname } = req.files[i]
        const parts = originalname.split(".")
        const ext = parts[parts.length - 1]
        const newPath = path + "." + ext
        fs.renameSync(path, newPath)
        uploadedFiles.push(newPath.replace("uploads/", ""));
    }
    res.json(uploadedFiles)
}

export const addHotel = async (req, res, next) => {
    const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests } = req.body
    try {
        console.log("hello")
        const place = await Place.create({
            owner: req.user._id,
            title,
            address,
            photos: addedPhotos,
            description,
            perks,
            extraInfo,
            checkIn,
            checkOut,
            maxGuests
        })
        res.status(201).json({
            success: true,
            place
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const getAllHotels = async (req, res, next) => {
    try {
        const userId = req.user._id
        const hotels = await Place.find({ owner: userId })
        res.status(200).json({
            success: true,
            hotels
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const getHotelById = async (req, res, next) => {
    try {
        const { hotelId } = req.params
        const hotel = await Place.findById(hotelId)
        if (!hotel) {
            res.status(404).json({
                success: false,
                message: "Hotel not found."
            })
        }
        res.status(200).json({
            success: true,
            hotel
        })
    } catch (error) {
        console.log(error.message)
    }
}

export const updateHotel = async (req, res, next) => {
    const { hotelId } = req.params;
    const { title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests } = req.body
    try {
        let hotel = await Place.findById(hotelId)
        if (!hotel) {
            res.status(404).json({
                success: false,
                message: "Hotel not found"
            })
        }
        hotel.title = title
        hotel.address = address
        hotel.photos = addedPhotos
        hotel.description = description
        hotel.perks = perks
        hotel.extraInfo = extraInfo
        hotel.checkIn = checkIn
        hotel.checkOut = checkOut
        hotel.maxGuests = maxGuests
        await hotel.save()
        res.status(200).json({
            success: true,
            hotel
        })
    } catch (error) {

    }
}