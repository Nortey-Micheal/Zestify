import { persistor } from "@/redux/store"
import { removeAuthentication } from "@/redux/user/isAuthenticated"
import { removeUser } from "@/redux/user/userSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"
import useGetNewRecipes from "../recipes/useGetNewRecipes"
import useGetPopularRecipes from "../recipes/useGetPopularRecipes"

const useLogOut = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { getNewRecipes } = useGetNewRecipes()
    const { getPopularRecipes } = useGetPopularRecipes()
    
    const logout = async() => {
        await persistor.purge()
        dispatch(removeUser())
        dispatch(removeAuthentication())
        await getNewRecipes()
        await getPopularRecipes()
        navigate('/')
    }

    return { logout }
}

export default useLogOut