import { setNewRecipes } from "@/redux/recipe/newRecipes"
import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"

const useGetNewRecipes = () => {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const dispatch = useDispatch()

    const getNewRecipes = async(page?:number, limit?:number) => {
        setError(null)
        setIsLoading(true)
        
        try {
            
            const response = await axios.post('http://localhost:5050/api/recipe/getNewRecipes', {
                limit,
                page
            })

            const recipes = response.data

            dispatch(setNewRecipes(recipes))
            setIsLoading(false)
        } catch (error:any) {
            setError(error.message)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }
    return { getNewRecipes, error, isLoading}
}

export default useGetNewRecipes;