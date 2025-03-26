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
            const response = await axios.get(`http://localhost:5050/api/recipe/getRecipe/${recipe_id}`)
            const recipe = response.data

            dispatch(setRecipePage(recipe))
            setIsLoading(false)

        } catch (error:any) {
            setError(error.message)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }

    }

    return { isLoading, error, getRecipeById }
}

export default useGetRecipeById