import multer from "multer"

const photosMiddleware = multer({
    dest: "uploads"
})

export default photosMiddleware