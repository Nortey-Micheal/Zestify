import Navbar from "@/components/navbar";
import { NavbarSmallScreen } from "@/components/navbarSmallScreen";
import ProfileOrLogin from "@/components/profileOrLogin";
import SearchSort, { SortType } from "@/components/searchSort";
import SearchBar from "@/components/ui/searchBar";
import { ChefHatIcon, CookieIcon, DrumstickIcon, EggFriedIcon, IceCreamBowlIcon, SandwichIcon, WineIcon } from "lucide-react";
import { Outlet } from "react-router";
import { Toaster } from "sonner";

export default function RecipeCategoryPage() {
    const categories:SortType[] = [
        {
            type: "All",
            Icon: ChefHatIcon,
            link: '/categories'
        },
        {
            type: "Breakfast",
            Icon: EggFriedIcon,
            link: 'breakfast'
        },
        {
            type: "Lunch",
            Icon: SandwichIcon,
            link: 'lunch',
        },
        {
            type: "Dinner",
            Icon: DrumstickIcon,
            link: 'dinner'
        },
        {
            type: "Dessert",
            Icon: IceCreamBowlIcon,
            link: 'dessert'
        },
        {
            type: "Beverages",
            Icon: WineIcon,
            link: 'beverages'
        },
        {
            type: "Snacks",
            Icon: CookieIcon,
            link: 'snacks'
        },
            
    ]
    return (
        <section className="lg:h-[100vh] lg:py-3 lg:flex gap-5 overflow-scroll ">
            <Navbar />
            <NavbarSmallScreen />
            <div className="lg:h-[100vh] overflow-scroll lg:pb-20 ">
                <div className="flex justify-between w-[90vw] lg:w-[80vw] items-center pt-2 borde mb-5 px-5">
                    <SearchBar placeholder={'Search for a recipe by title or ingredient'} className='w-[100%] mx-auto lg:mx-0 lg:w-[50%] '/>
                    <ProfileOrLogin display='hidden lg:block'/>
                </div>
                <div className="mt-10 lg:mt-0 borde lg:w-[80vw]  ">
                    <div className="flex items-center justify-between px-5 gap-5">
                        <p>Categories</p>
                        <div className="flex items-center gap-3 lg:gap-5">
                            <p>Sort</p>
                            <SearchSort sortBy={categories} />
                        </div>
                    </div>
                    <div className="bg-(--rose-white) lg:px-5 px-2 py-1 lg:py-3 rounded-xl w-[95vw] lg:w-[80vw] mx-auto mt-5 ">
                        <Outlet />
                        <Toaster richColors position="top-center"/>
                    </div>
                </div>
            </div>
        </section>
    )
}