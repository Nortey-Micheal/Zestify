import User from "../models/userModel.js"

export const signup = async (req,res) => {
    const { email, password, name } = req.body

    try {
        const user = await User.signup({email,password,name})
        
        res.json({...user._doc,password: undefined}).status(200)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const verifyEmail = async (req,res) => {
    const { verificationToken } = req.body
    try {
        await User.verifyToken(verificationToken)
        res.status(200).json({message: 'Email address has been successfully verified'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const login = async (req,res) => {
    const { email, password } = req.body

    try {
        const user = await User.login({email,password})
        res.status(200).json({...user._doc, password: undefined})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const uploadProfile = async (req, res) => {
    try {
        const { email } = req.body; // Get the recipe ID

        // ✅ Upload Image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            upload_preset: "userProfilePic_preset",
        });

        const user = await User.findOne({email})

        // ✅ Update the Profile with email
        await Recipe.findByIdAndUpdate(user._id, { profilePicture: result.public_id });

        res.status(200).json({ message: "Profile Picture updated successfully", imageUrl: result.public_id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};