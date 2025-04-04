import axios from "axios"
import { useState } from "react"

const useLikeRecipe = () => {
    const [likeError,setLikeError] = useState<string | null>(null)
    const [isLiking,setIsLiking] = useState<boolean>(false)
    const [likeSuccess,setLikeSuccess] = useState<boolean>(false)
    
    const likeRecipe = async (id:string,email:string) => {
        setLikeError(null)
        setIsLiking(true)
        try {
            await axios.post('http://localhost:5050/api/recipe/likeRecipe',{
                id,email
            },{withCredentials: true})

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
            await axios.post('http://localhost:5050/api/recipe/unlikeRecipe',{
                id,email
            },{withCredentials: true})

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