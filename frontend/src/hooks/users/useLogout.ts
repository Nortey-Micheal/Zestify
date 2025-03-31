import { persistor } from "@/redux/store"
import { removeAuthentication } from "@/redux/user/isAuthenticated"
import { removeUser } from "@/redux/user/userSlice"
import { useDispatch } from "react-redux"

const useLogOut = () => {
    const dispatch = useDispatch()
    
    
    const logout = async() => {
        await persistor.purge()
        dispatch(removeUser())
        dispatch(removeAuthentication())
    }

    return { logout }
}

export default useLogOut