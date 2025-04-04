import express from 'express'
import { addRecipe, getAllRecipes, getNewRecipes, getPopularRecipes, getRecipeById, getRecipesByCategory, likeRecipe, searchRecipe, unLikeRecipe, uploadImage } from '../controllers/recipeController.js'
import multer from 'multer';
import verifyJWTToken from '../middleware/verifyToken.js';

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

//only verified users can do these
recipeRouter.post('/add-recipe', verifyJWTToken, addRecipe)// ✅ JSON Upload
recipeRouter.post('/upload-image', verifyJWTToken, upload.single("image"), uploadImage); // ✅ Image Upload
recipeRouter.post('/likeRecipe', verifyJWTToken, likeRecipe)
recipeRouter.post('/unlikeRecipe', verifyJWTToken, unLikeRecipe)

//all users can do this
recipeRouter.post('/getAllRecipes', getAllRecipes)
recipeRouter.post('/recipesByCategory', getRecipesByCategory)
recipeRouter.post('/getNewRecipes', getNewRecipes)
recipeRouter.get('/getRecipe/:recipe_id', getRecipeById)
recipeRouter.post('/getPopularRecipes', getPopularRecipes)
recipeRouter.post('/searchRecipe',searchRecipe)

export default recipeRouter