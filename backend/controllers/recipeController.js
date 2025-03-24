import cloudinary from "../cloudinary/cloudinary.js";
import Recipe from "../models/recipeModel.js"

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

        console.log(result)

        // ✅ Update the Recipe with Image URL
        await Recipe.findByIdAndUpdate(uploadUrl, { image: result.public_id });

        res.status(200).json({ message: "Image uploaded successfully", imageUrl: result.public_id });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getAllRecipes = async (req, res) => {

    try {
        const allRecipes = await Recipe.getAllRecipes()
        res.status(200).json({...allRecipes})
    } catch (error) {
        res.status(500).json({message: error.message})
    }
}