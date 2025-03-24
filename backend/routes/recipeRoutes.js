import express from 'express'
import { addRecipe, getAllRecipes, uploadImage } from '../controllers/recipeController.js'
import multer from 'multer';

const recipeRouter = express.Router()

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
  
recipeRouter.post('/add-recipe', addRecipe)// ✅ JSON Upload
recipeRouter.post('/upload-image', upload.single("image"), uploadImage); // ✅ Image Upload
recipeRouter.get('/getAllRecipes', getAllRecipes)

export default recipeRouter