import express from 'express'
import { login, signup, uploadProfile, verifyEmail } from '../controllers/userController.js'
import multer from 'multer';

const userRouter = express.Router()

// Configure Multer Storage (files will be stored in "uploads" folder)
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Ensure the folder exists
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage });

userRouter.post('/signup',signup)
userRouter.post('/verify-email',verifyEmail)
userRouter.post('/login',login)
userRouter.post('/upload-profilePic', upload.single("profilePicture"), uploadProfile)

export default userRouter