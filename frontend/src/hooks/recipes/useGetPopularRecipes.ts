import { setPopularRecipes } from "@/redux/recipe/popularRecipes"
import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"

const useGetPopularRecipes = () => {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const dispatch = useDispatch()

    const getPopularRecipes = async(limit?:number) => {
        setError(null)
        setIsLoading(true)
        
        try {
            
            const response = await axios.post('http://localhost:5050/api/recipe/getPopularRecipes',{limit})

            const recipes = response.data

            dispatch(setPopularRecipes(recipes))
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