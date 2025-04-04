import express from 'express'
import { bookmarkRecipe, getUserFavorites, login, removeBookmarkRecipe, signup, uploadProfile, verifyEmail } from '../controllers/userController.js'
import multer from 'multer';
import verifyJWTToken from '../middleware/verifyToken.js';

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
userRouter.post('/bookmark-recipe',verifyJWTToken,bookmarkRecipe)
userRouter.post('/remove-recipeBookmark',verifyJWTToken,removeBookmarkRecipe)
userRouter.post('/getUserFavorites',verifyJWTToken,getUserFavorites)

export default userRouter