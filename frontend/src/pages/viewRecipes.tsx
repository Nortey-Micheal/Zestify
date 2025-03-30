import Navbar from "@/components/navbar"
import { NavbarSmallScreen } from "@/components/navbarSmallScreen"
import ProfileOrLogin from "@/components/profileOrLogin"
import SearchSort from "@/components/searchSort"
import SearchBar from "@/components/ui/searchBar"
import { Outlet } from "react-router"

export default function ViewRecipes() {

    return (
        <div className="h-[100vh] lg:py-5 lg:flex ">
            <Navbar />
            <NavbarSmallScreen />
            <section className="lg:ml-5 w-[95vw] mx-auto ">
                <div className="flex justify-between lg:w-[80vw] items-center pt-2 borde">
                    <SearchBar placeholder={'Search for a recipe'} className='w-[100%] mx-auto lg:mx-0 lg:w-[70%] '/>
                    <ProfileOrLogin display='hidden lg:block'/>
                </div>
                <div className="mt-10 borde lg:w-[80vw]">
                    <div className="flex items-center justify-between">
                        <p>RECIPES</p>
                        <div className="flex items-center gap-5">
                            <p>Sort</p>
                            <SearchSort />
                        </div>
                    </div>
                    <div>
                        <Outlet />
                    </div>
                </div>
            </section>
        </div>
    )
}