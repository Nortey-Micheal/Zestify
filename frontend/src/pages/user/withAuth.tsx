import { RootState } from "@/redux/store"
import { ComponentType, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"
import { toast } from "sonner"

const withAuth = <P extends object>(Component:ComponentType) =>{
    return (props: P) => {
        const navigate = useNavigate()
        const isAuthenticated = useSelector((state:RootState) => state.isAuthenticated)

        useEffect(() => {
            if (!isAuthenticated) {
                navigate('/auth/login')
                setTimeout(() => {
                    toast.error('You need to be logged in to access the page')
                },200)
            }
        },[navigate,isAuthenticated])

        return isAuthenticated ? <Component {...props} /> : null
    }
}

export default withAuth