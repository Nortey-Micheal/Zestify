import cloudinary from "../cloudinary/cloudinary.js";
import Recipe from "../models/recipeModel.js"
import User from "../models/userModel.js";
import fs from 'fs'

export const addRecipe = async (req,res) => {
    const { title, description, ingredients, author, instructions, cookTime, category } = req.body
    const instructionsArray = JSON.parse(instructions || "[]");
    const ingredientsArray = JSON.parse(ingredients || "[]");

    try {

        const uploader = await User.findOne({email:author})

        const newRecipe = await Recipe.addRecipe({
            title, description, 
            ingredients:ingredientsArray, author, authorPic: uploader.profilePicture, 
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
    let { page = 1, limit = 6} = req.body
    page = parseInt(page);
    limit = parseInt(limit);
    try {
        const allRecipes = await Recipe.getAllRecipes(limit,page)
        res.status(200).json(allRecipes)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getRecipesByCategory = async (req,res) => {
    let { category,page = 1, limit = 6} = req.body
    page = parseInt(page);
    limit = parseInt(limit);

    try {
        if (!category) {
            const recipes = await Recipe.find({})
                                    .skip((page - 1) * limit)
                                    .limit(limit)
            res.status(200).json(recipes)
        } else {
            const recipes = await Recipe.find({category})
                                    .skip((page - 1) * limit)
                                    .limit(limit)
            res.status(200).json(recipes)
        }
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getNewRecipes = async (req,res) => {
    let { page = 1, limit = 6} = req.body
    page = parseInt(page);
    limit = parseInt(limit);
    try {
        const recipes = await Recipe.find()
                                    .sort({createdAt: -1})
                                    .skip((page - 1) * limit)
                                    .limit(limit)
        res.status(200).json(recipes)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getPopularRecipes = async (req,res) => {
    let { page = 1, limit = 6} = req.body
    page = parseInt(page);
    limit = parseInt(limit);
    try {
        const recipes = await Recipe.find()
                                    .sort({likes: -1})
                                    .skip((page - 1) * limit)
                                    .limit(limit)
        res.status(200).json(recipes)
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const likeRecipe = async (req,res) => {
    const { id,email } = req.body

    try {
        const recipe = await Recipe.findById(id)
        recipe.likes.value = recipe.likes.value + 1
        recipe.likes.by = [...recipe.likes.by,email]
        recipe.save()
        res.status(200).json({message: 'Recipe has been liked'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const unLikeRecipe = async (req,res) => {
    const { id,email } = req.body

    try {
        const recipe = await Recipe.findById(id)
        recipe.likes.value = recipe.likes.value - 1
        const newLikeBy = recipe.likes.by.filter(by => by !== email)
        recipe.likes.by = newLikeBy
        recipe.save()
        res.status(200).json({message: 'Recipe has been liked'})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}

export const getRecipeById = async (req,res) => {
    const { recipe_id } = req.params

    try {
        const recipe = await Recipe.findOne({ _id:recipe_id })
        res.status(200).json(recipe)
    } catch (error) {
        res.status(500).json({message: error.message})   
    }
}

export const searchRecipe = async (req,res) => {
    const { searchItem, limit = 6, page = 1 } = req.body
try {
    const recipes = await Recipe.find(
        {$text: {$search: searchItem}},
        {score: {$meta: "textScore"}} //rank the search results by relevance
    ).sort({score: {$meta: "textScore"}})
     .skip((page - 1) * limit)
     .limit(limit)
    res.status(200).json(recipes)
} catch (error) {
    res.status(500).json({message: error.message})
}
}