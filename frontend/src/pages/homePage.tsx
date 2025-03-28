import Categories from "@/components/categories";
import Navbar from "@/components/navbar";
import { NavbarSmallScreen } from "@/components/navbarSmallScreen";
import Profile from "@/components/profile";
import { RootState } from "@/redux/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";

export default function Home() {
    const user = useSelector((state:RootState) => state.user)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        if(params) {
            navigate('/')
            console.log(params)
        }
    },[])

    return (
        <div className="bg-(--white) max-w-[1300px w-[95vw] lg:py-5 lg:h-[100vh] mx-auto flex gap-2 flex-col lg:flex-row">
            <Navbar />
            <NavbarSmallScreen />
            <Categories />
            {user.email && <Profile />}
        </div>
    )
}