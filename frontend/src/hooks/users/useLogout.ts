import { persistor } from "@/redux/store"
import { removeUser } from "@/redux/user/userSlice"
import { useDispatch } from "react-redux"

const useLogOut = () => {
    const dispatch = useDispatch()
    
    
    const logout = async() => {
        await persistor.purge()
        dispatch(removeUser())
    }

    return { logout }
}

export default useLogOut