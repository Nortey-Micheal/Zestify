import Categories from "@/components/categories";
import Navbar from "@/components/navbar";
import { NavbarSmallScreen } from "@/components/navbarSmallScreen";
import Profile from "@/components/profile";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

export default function Home() {
    const user = useSelector((state:RootState) => state.user)
    return (
        <div className="max-w-[1300px w-[95vw] lg:py-5 lg:h-[100vh] mx-auto flex gap-5 flex-col lg:flex-row">
            <Navbar />
            <NavbarSmallScreen />
            <Categories />
            {user.email && <Profile />}
        </div>
    )
}