import { setRecipes } from "@/redux/recipe/recipeSlice"
import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"

const useGetAllRecipes = () => {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const dispatch = useDispatch()

    const getAllRecipes = async (limit?: number) => {
        setError(null)
        setIsLoading(true)

        try {
            const response = await axios.post('http://localhost:5050/api/recipe/getAllRecipes', {
                limit
            })
            const recipes = response.data
            dispatch(setRecipes(recipes))
            setIsLoading(false)
        } catch (error:any) {
            setError(error.message)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }

    }

    return { error, isLoading, getAllRecipes }
}

export default useGetAllRecipes