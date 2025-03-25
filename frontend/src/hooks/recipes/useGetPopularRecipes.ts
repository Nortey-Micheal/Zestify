import { setRecipes } from "@/redux/recipe/recipeSlice"
import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"

const useGetPopularRecipes = () => {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const dispatch = useDispatch()

    const getPopularRecipes = async() => {
        setError(null)
        setIsLoading(true)
        
        try {
            
            const response = await axios.get('http://localhost:5050/api/recipe/getPopularRecipes')

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
    return { getPopularRecipes, error, isLoading}
}

export default useGetPopularRecipes;