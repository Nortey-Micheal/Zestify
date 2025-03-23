import { useState } from "react"
import axios from 'axios'

interface Recipe {
    title : string,
    description: string,
    author: string,
    cookTime: number,
    category: string,
    ingredients: {
        id: string
        value: string
    }[],
    instructions: {
        id: string
        value: string
    }[],
    image: File | null,
}

const useAddRecipe = () => {

    const [ error, setError ] = useState<string | null>(null)
    const [ isLoading, setIsLoading ] = useState<boolean>(false)

    const addRecipe = async({title,description,author,cookTime,category,ingredients,instructions,image}: Recipe) => {
        const formData = new FormData()
        formData.append('image', image!)

        const ingredientsString = JSON.stringify(ingredients)
        const instructionsString = JSON.stringify(instructions)
        
        try {
            setError(null)
            setIsLoading(true)

            const response = await axios.post("http://localhost:5050/api/recipe/add-recipe",{
                    title,description,
                    author,cookTime,category,
                    ingredients:ingredientsString,instructions:instructionsString,image:undefined
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            )

            const { uploadUrl } = response.data
            

            // if (response.status !== 200) {
            //     throw new Error(data)
            // }

            // console.log(data)

            // ✅ Now send the image separately
            if (image) {
                formData.append("uploadUrl", uploadUrl);
                await axios.post("http://localhost:5050/api/recipe/upload-image", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                });
            }

        console.log("Recipe added successfully");

        } catch (error:any) {
            setError(error.message)
        }

    }
    return { addRecipe, error, isLoading }
}

export default useAddRecipe