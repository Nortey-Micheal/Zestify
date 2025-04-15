import { setPopularRecipes } from "@/redux/recipe/popularRecipes"
import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"

const useGetPopularRecipes = () => {
    const [error, setError] = useState<string | null>(null)
    const [isPopularRecipeLoading, setIsPopularRecipeLoading] = useState<boolean>(false)
    const dispatch = useDispatch()

    const getPopularRecipes = async(page?:number, limit?:number) => {
        setError(null)
        setIsPopularRecipeLoading(true)
        
        try {
            
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/recipe/getPopularRecipes`,{limit,page})

            const recipes = response.data

            dispatch(setPopularRecipes(recipes))
            setIsPopularRecipeLoading(false)
        } catch (error:any) {
            if (error.response) {
                setError(error.response.data.message)
            } else {
                setError(error.message)
            }
            setIsPopularRecipeLoading(false)
        } finally {
            setIsPopularRecipeLoading(false)
        }
    }
    return { getPopularRecipes, error, isPopularRecipeLoading}
}

export default useGetPopularRecipes;