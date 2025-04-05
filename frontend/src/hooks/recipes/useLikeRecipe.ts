import axios from "axios"
import { useState } from "react"
import useGetNewRecipes from "./useGetNewRecipes"
import useGetPopularRecipes from "./useGetPopularRecipes"

const useLikeRecipe = () => {
    const [likeError,setLikeError] = useState<string | null>(null)
    const [isLiking,setIsLiking] = useState<boolean>(false)
    const [likeSuccess,setLikeSuccess] = useState<boolean>(false)
    const {getNewRecipes} = useGetNewRecipes()
    const {getPopularRecipes} = useGetPopularRecipes()
    
    const likeRecipe = async (id:string,email:string) => {
        setLikeError(null)
        setIsLiking(true)
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/recipe/likeRecipe`,{
                id,email
            },{withCredentials: true})

            getNewRecipes()
            getPopularRecipes()
            setLikeSuccess(true)
            setIsLiking(false)
            
        } catch (error:any) {

            setIsLiking(false)
            setLikeSuccess(false)
            if (error.response) {
                setLikeError(error.response.data.message)
            } else {
                setLikeError(error.message)
            }

        } finally {
            setIsLiking(false)
            setLikeSuccess(false)
        }
    }

    const unLikeRecipe = async (id:string,email:string) => {
        setLikeError(null)
        setIsLiking(true)
        try {
            await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/recipe/unlikeRecipe`,{
                id,email
            },{withCredentials: true})

            getNewRecipes()
            getPopularRecipes()
            setLikeSuccess(true)
            setIsLiking(false)

        } catch (error:any) {

            setLikeSuccess(false)
            setIsLiking(false)
            if (error.response) {
                setLikeError(error.response.data.message)
            } else {
                setLikeError(error.message)
            }
            
        } finally {
            setIsLiking(false)
            setLikeSuccess(false)
        }
        
    }

    return {likeError, likeSuccess, isLiking, likeRecipe,unLikeRecipe }

}

export default useLikeRecipe