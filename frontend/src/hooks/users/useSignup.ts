import axios from "axios"
import { useState } from "react"

interface SignupType {
    name: string;
    email: string;
    password: string;
    confirmPassword: string
    profilePicture: File;
}

const useSignup = () => {
    const [error,setError] = useState<string | null>(null)
    const [isLoading,setIsLoading] = useState<boolean>(false)

    const signup = async({email,name,password,profilePicture}: SignupType) => {
        const formData = new FormData()
        formData.append('profilePicture', profilePicture)

        try {
            setIsLoading(true)
            setError(null)

            await axios.post('http://localhost:5050/api/user/signup', 
                {
                    name,email,password
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

            console.log({email,name,password,profilePicture})

            setIsLoading(false)

        } catch (error:any) {
            setError(error.message)
            setIsLoading(false)
        } finally {
            setIsLoading(false)
        }
    }
    return { signup,error,isLoading}
}

export default useSignup