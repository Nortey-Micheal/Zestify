import { persistor } from "@/redux/store"
import { removeAuthentication } from "@/redux/user/isAuthenticated"
import { removeUser } from "@/redux/user/userSlice"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router"

const useLogOut = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    
    const logout = async() => {
        await persistor.purge()
        dispatch(removeUser())
        dispatch(removeAuthentication())
        navigate('/')
    }

    return { logout }
}

export default useLogOut