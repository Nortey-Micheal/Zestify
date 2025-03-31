import { RootState } from "@/redux/store"
import { ComponentType, useEffect } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router"

const withAuth = <P extends object>(Component:ComponentType) =>{
    return (props: P) => {
        const navigate = useNavigate()
        const isAuthenticated = useSelector((state:RootState) => state.isAuthenticated)

        useEffect(() => {
            if (!isAuthenticated) {
                alert('Please login to continue')
                navigate('/auth/login')
            }
        },[navigate,isAuthenticated])

        return isAuthenticated ? <Component {...props} /> : null
    }
}

export default withAuth