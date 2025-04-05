import { setCategoriesRecipes } from "@/redux/recipe/categories"
import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"

interface searchType {
    category?: string,
    limit?: number,
    page?:number
}

const useGetRecipeByCategory = () => {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const dispatch = useDispatch()

    const getRecipeByCategory = async ({category,limit,page}:searchType) => {
        setError(null)
        setIsLoading(true)

        try {
            const response = await axios.post('http://localhost:5050/api/recipe/recipesByCategory', {category, limit, page})
            const recipes = response.data
            dispatch(setCategoriesRecipes(recipes))
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