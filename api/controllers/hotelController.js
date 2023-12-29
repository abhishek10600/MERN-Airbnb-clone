import imageDownloader from "image-downloader"
import path from "path"
import { fileURLToPath } from "url"

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