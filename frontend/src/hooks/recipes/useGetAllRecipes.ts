import { setRecipes } from "@/redux/recipe/recipeSlice"
import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"

const useGetAllRecipes = () => {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const dispatch = useDispatch()

    const getAllRecipes = async (page?:number, limit?: number) => {
        setError(null)
        setIsLoading(true)

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/recipe/getAllRecipes`, {
                limit,
                page
            })
            const recipes = response.data
            dispatch(setRecipes(recipes))
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

    return { error, isLoading, getAllRecipes }
}

export default useGetAllRecipes