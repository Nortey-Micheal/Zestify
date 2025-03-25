import cloudinary from "../cloudinary/cloudinary.js";
import Recipe from "../models/recipeModel.js"
import fs from 'fs'

export const addRecipe = async (req,res) => {
    const { title, description, ingredients, author, instructions, cookTime, category } = req.body
    const instructionsArray = JSON.parse(instructions || "[]");
    const ingredientsArray = JSON.parse(ingredients || "[]");

    try {

        // console.log({title, description, ingredients:ingredientsArray, author, instructions:instructionsArray, cookTime, category})

        const newRecipe = await Recipe.addRecipe({
            title, description, 
            ingredients:ingredientsArray, author, 
            instructions:instructionsArray, cookTime, category
        })
        
        res.status(201).json({message: "Recipe has just been uploaded",uploadUrl: newRecipe._id})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const uploadImage = async (req, res) => {
    try {
        const { uploadUrl } = req.body; // Get the recipe ID

        // ✅ Upload Image to Cloudinary
        const result = await cloudinary.uploader.upload(req.file.path, {
            upload_preset: "recipeImage_Preset",
        });

        // ✅ Delete the uploaded file from local server
        fs.unlink(req.file.path, (err) => {
            if (err) {
              console.error("Error deleting file:", err);
            } else {
              console.log("File deleted successfully from server");
            }
        });
      

        console.log(result)

        // ✅ Update the Recipe with Image URL
        await Recipe.findByIdAndUpdate(uploadUrl, { image: result.public_id });

        res.status(200).json({ message: "Image uploaded successfully", imageUrl: result.public_id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllRecipes = async (req, res) => {
    const { limit } = req.body
    try {
        const allRecipes = await Recipe.getAllRecipes(limit)
        res.status(200).json({...allRecipes})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getRecipesByCategory = async (req,res) => {
    const { category } = req.body

    try {
        const recipes = await Recipe.find({category})
        res.status(200).json(recipes)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getNewRecipes = async (req,res) => {
    const { limit } = req.body
    try {
        const recipes = await Recipe.find().sort({createdAt: -1}).limit(limit|| 6)
        res.status(200).json(recipes)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getPopularRecipes = async (req,res) => {
    const { limit } = req.body
    try {
        const recipes = await Recipe.find().sort({likes: 1}).limit(limit|| 6)
        res.status(200).json(recipes)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const likeRecipe = async (req,res) => {
    const { id } = req.body

    try {
        const recipe = await Recipe.findByIdAndUpdate(id, { $inc: { likes: 1 } },{new: true})
        res.status(200).json({message: 'Recipe has been liked'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const unLikeRecipe = async (req,res) => {
    const { id } = req.body

    try {
        const recipe = await Recipe.findByIdAndUpdate(id, { $inc: { likes: -1 } },{new: true})
        res.status(200).json({message: 'Recipe has been liked'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}