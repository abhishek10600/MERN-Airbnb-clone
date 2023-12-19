export const registerUser = async (req, res, next) => {
    const { name, email, password } = req.body
    try {
        res.status(200).json({
            success: true,
            message: "User controller working",
            name,
            email,
            password
        })
    } catch (error) {
        console.log(error.message)
    }
}