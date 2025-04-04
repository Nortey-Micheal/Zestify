import { useState } from "react"
import axios from 'axios'
import { Recipe } from "@/redux/recipe/recipeSlice"
import { useNavigate } from "react-router"



const useAddRecipe = () => {

    const [ error, setError ] = useState<string | null>(null)
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const navigate = useNavigate()

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
                    withCredentials: true
                }
            )

            const { uploadUrl } = response.data
            
            if (image) {
                formData.append("uploadUrl", uploadUrl);
                await axios.post("http://localhost:5050/api/recipe/upload-image", formData, {
                    headers: { "Content-Type": "multipart/form-data" },
                    withCredentials: true,
                });
            }

            navigate('/')

        } catch (error:any) {
            if (error.response) {
                setError(error.response.data.message)
            } else {
                setError(error.message)
            }
        } finally {
            setIsLoading(false)
        }

    }
    return { addRecipe, error, isLoading }
}

export default useAddRecipe