import cloudinary from "../cloudinary/cloudinary.js";
import Recipe from "../models/recipeModel.js"

export const addRecipe = async (req,res) => {
    const { title, description, ingredients, image, author, instructions, cookTime, category } = req.body

    // Upload a recipe image
    const uploadResult = await cloudinary.uploader.upload(image, {
        upload_preset: "recipeImage_Preset", 
        allowed_formats: ['png','jpg','svg','ico','jfif','webp']
        },
    )
    .then(() => {
        console.log('Image sent')
    })

    .catch((error) => {
        throw new Error(error.message)
    });

    try {

        await Recipe.addRecipe({title, description, ingredients, image:uploadResult.public_id, author, instructions, cookTime, category})
        
        res.status(201).json({message: "Recipe has just been uploaded"})

    } catch (error) {
        res.status(500).json({message: error.message})
    }
}