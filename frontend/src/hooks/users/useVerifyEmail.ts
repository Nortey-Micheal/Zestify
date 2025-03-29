import axios from "axios"
import { useState } from "react"

const useVerifyEmail = () => {
    const [ error, setError ] = useState<string | null>(null)
    const [ isLoading, setIsLoading ] = useState<boolean>(false)
    const [success,setSuccess] = useState<boolean>(false)
    const verifyEmail = async (verificationToken:string) => {
        setIsLoading(true)
        setError(null)
        setSuccess(false)

        try {
            const response = await axios.post('http://localhost:5050/api/user/verify-email',{verificationToken})

            setIsLoading(false)
            setSuccess(true)

        } catch (error:any) {
            setSuccess(false)
            setIsLoading(false)
            setError(error.response.data.message)
        } finally {
            setIsLoading(false)
        }
    }

    return { verifyEmail, isLoading, error, success }
}

export default useVerifyEmail