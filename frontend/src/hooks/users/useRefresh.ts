import { setUser } from "@/redux/user/userSlice"
import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"

const useRefresh = () => {
    const dispatch = useDispatch()
    const [error,setError] = useState<string | null>(null)
    const [isLoading,setIsLoading] = useState<boolean>(false)

    const refresh = async (email:string) => {
        setIsLoading(true)
        setError(null)

        try {
            const response = await axios.post('http://localhost:5050/api/user/refresh',{ email })
            const userData = response.data
            dispatch(setUser(userData))
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

    return { refresh, error, isLoading }
}

export default useRefresh