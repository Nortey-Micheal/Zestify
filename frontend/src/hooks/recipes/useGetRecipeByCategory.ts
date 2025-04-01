import { setRecipes } from "@/redux/recipe/recipeSlice"
import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"

const useGetRecipeByCategory = () => {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const dispatch = useDispatch()

    const getRecipeByCategory = async (category:string,limit?:6,page?:number) => {
        setError(null)
        setIsLoading(true)

        try {
            const response = await axios.post('http://localhost:5050/api/recipe/recipesByCategory', {category, limit, page})
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

    return { error, isLoading, getRecipeByCategory }
}

export default useGetRecipeByCategory