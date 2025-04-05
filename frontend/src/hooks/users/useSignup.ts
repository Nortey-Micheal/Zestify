import axios from "axios"
import { useState } from "react"
import { useNavigate } from "react-router";

interface SignupType {
    name: string;
    email: string;
    password: string;
    confirmPassword: string
    profilePicture: File;
    bio: string
}

const useSignup = () => {
    const [error,setError] = useState<string | null>(null)
    const [isLoading,setIsLoading] = useState<boolean>(false)
    const navigate = useNavigate()

    const signup = async({email,name,password,bio,profilePicture}: SignupType) => {
        const formData = new FormData()
        formData.append('profilePicture', profilePicture)

        try {
            setIsLoading(true)
            setError(null)

            await axios.post('http://localhost:5050/api/user/signup', 
                {
                    name,email,password,bio
                },
                {
                    headers: { 'Content-Type': 'application/json' },
                }
            )

            if (profilePicture) {
                formData.append('email', email)
                await axios.post('http://localhost:5050/api/user/upload-profilePic', formData, {
                    headers: {"Content-Type": "multipart/form-data"},
                })
            }

            setIsLoading(false)

            navigate('/auth/verify-email')

        } catch (error:any) {
            if (error.response) {
                setError(error.response.data.message)
            } else {
                setError(error.message)
            }
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }
    return { signup,error,isLoading}
}

export default useSignup