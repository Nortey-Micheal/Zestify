import { Recipe } from "@/redux/recipe/recipeSlice"
import { setFavoriteRecipes } from "@/redux/user/userSlice"
import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"

const useBookmarkRecipe = () => {
    const [error,setError] = useState<string | null>(null)
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const [success,setSuccess] = useState<boolean>(false)
    const dispatch = useDispatch()

    const getUserFavorites = async(email:string) => {
        setError(null)
        setIsLoading(true)
        try {
            const response = await axios.post('${import.meta.env.VITE_BACKEND_URL}/api/user/getUserFavorites',{email},{withCredentials: true})

            dispatch(setFavoriteRecipes(response.data))
            setIsLoading(false)
        } catch (error:any) {
            setIsLoading(false)
            if (error.response) {
                setError(error.response.data.message)
            } else {
                setError(error.message)
            }
        }
    }

    const bookmarkRecipe = async (email:string,recipe:Recipe) => {
        setError(null)
        setIsLoading(true)
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/bookmark-recipe`,{
                recipe, email
            },{withCredentials: true})
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/getUserFavorites`,{email},{withCredentials: true})

            dispatch(setFavoriteRecipes(response.data))
            setSuccess(true)
            setIsLoading(false)
            
        } catch (error:any) {

            setIsLoading(false)
            setSuccess(false)
            if (error.response) {
                setError(error.response.data.message)
            } else {
                setError(error.message)
            }

        } finally {
            setIsLoading(false)
            setSuccess(false)
        }
    }

    const removeBookmarkRecipe = async (email:string,recipe:Recipe) => {
        setError(null)
        setIsLoading(true)
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/remove-recipeBookmark`,{
                recipe, email
            },{withCredentials: true})

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/user/getUserFavorites`,{email},{withCredentials: true})

            dispatch(setFavoriteRecipes(response.data))
            setSuccess(true)
            setIsLoading(false)

        } catch (error:any) {

            setSuccess(false)
            setIsLoading(false)
            if (error.response) {
                setError(error.response.data.message)
            } else {
                setError(error.message)
            }
            
        } finally {
            setIsLoading(false)
            setSuccess(false)
        }
    }

    return {error, success, isLoading, bookmarkRecipe, getUserFavorites, removeBookmarkRecipe }
}

export default useBookmarkRecipe