import Navbar from "@/components/navbar"
import { NavbarSmallScreen } from "@/components/navbarSmallScreen"
import ProfileOrLogin from "@/components/profileOrLogin"
import SearchSort from "@/components/searchSort"
import SearchBar from "@/components/ui/searchBar"
import { Outlet } from "react-router"
import { Toaster } from "sonner"

export default function ViewRecipes() {

    return (
        <div className="lg:h-[100vh] lg:py-5 lg:flex ">
            <Navbar />
            <NavbarSmallScreen />
            <section className="lg:ml-5 w-[95vw] mx-auto lg:h-[100vh] overflow-scroll pb-10 ">
                <div className="flex justify-between w-[90vw] lg:w-[80vw] items-center pt-2 borde">
                    <SearchBar placeholder={'Search for a recipe'} className='w-[100%] mx-auto lg:mx-0 lg:w-[70%] '/>
                    <ProfileOrLogin display='hidden lg:block'/>
                </div>
                <div className="mt-10 borde lg:w-[80vw] ">
                    <div className="flex items-center justify-between">
                        <p>RECIPES</p>
                        <div className="flex items-center gap-5">
                            <p>Sort</p>
                            <SearchSort />
                        </div>
                    </div>
                    <div className="bg-(--rose-white) lg:px-5 px-2 py-1 lg:py-3 rounded-xl w-[95vw] lg:w-[80vw] mx-auto mt-5 ">
                        <Outlet />
                        <Toaster richColors position="top-center"/>
                    </div>
                </div>
            </section>
        </div>
    )
}