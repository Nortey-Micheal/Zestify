import { setNewRecipes } from "@/redux/recipe/newRecipes"
import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"

const useGetNewRecipes = () => {
    const [error, setError] = useState<string | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const getNewRecipes = async() => {
        setError(null)
        setIsLoading(true)
        
        try {
            
            const response = await axios.get('http://localhost:5050/api/recipe/getNewRecipes')

            const recipes = response.data

            dispatch(setNewRecipes(recipes))
            setIsLoading(false)
            navigate('/')
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