import { setRecipePage } from "@/redux/recipe/recipePageSlice"
import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"

const useGetRecipeById = () => {
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [error,setError] = useState<string | null>(null)
    const dispatch = useDispatch()

    const getRecipeById = async (recipe_id:string) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/recipe/getRecipe/${recipe_id}`)
            const recipe = response.data

            dispatch(setRecipePage(recipe))
            setIsLoading(false)

        } catch (error:any) {
            if (error.response) {
                setError(error.response.data.message)
            } else {
                setError(error.message)
            }
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }

    }

    return { isLoading, error, getRecipeById }
}

export default useGetRecipeById