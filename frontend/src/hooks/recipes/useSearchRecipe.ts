import { setSearchRecipes } from "@/redux/recipe/searchRecipe"
import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { useLocation, useNavigate } from "react-router"

const useSearchRecipe = () => {
    const [isSearching,setIsSearching] = useState<boolean>(false)
    const [searchingSuccess,setSearchingSuccess] = useState<boolean>(false)
    const [searchError,setSearchError] = useState<string | null>(null)
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const location = useLocation()

    const searchRecipe = async (searchItem:string,page:number) => {
        setIsSearching(true)
        setSearchError(null)
        setSearchingSuccess(false)

        try {
            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/recipe/searchRecipe/`,{searchItem,page})
            const recipes = response.data

            dispatch(setSearchRecipes(recipes))
            setSearchingSuccess(true)
            setIsSearching(false)
            if (location.pathname !== '/recipe-search') {
                navigate('/recipe-search')
            }
        } catch (error:any) {
            if (error.response) {
                setSearchError(error.response.data.message)
            } else {
                setSearchError(error.message)
            }
            setIsSearching(false)
            setSearchingSuccess(false)
        } finally {
            setIsSearching(false)
        }

    }

    return { isSearching, searchError, searchRecipe, searchingSuccess }
}

export default useSearchRecipe