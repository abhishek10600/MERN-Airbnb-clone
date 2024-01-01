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
            addedPhotos,
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