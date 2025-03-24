import axios from "axios"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { setUser } from "@/redux/user/userSlice"

const useLogin = () => {
    const [ error, setError ]  = useState<string | null>(null)
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const dispatch = useDispatch()

    const login = async({email,password}:{email:string,password:string}) => {
        setError(null)
        setIsLoading(true)
        
        try {
            const response = await axios.post('http://localhost:5050/api/user/login',{
                email,password
            })
            const data = response.data

            if (response.status !== 200) {
                throw new Error (data)
            }
            dispatch(setUser(data))
            setIsLoading(false)
        } catch (error:any) {
            setIsLoading(false)
            setError(error.message)
        }
    }

    return { login, error, isLoading }
}

export default useLogin