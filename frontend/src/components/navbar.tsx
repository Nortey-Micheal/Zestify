import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { RootState } from "@/redux/store"
import { Heart, HomeIcon, LibraryBigIcon, PlusIcon, SearchIcon, UserCircle, UtensilsCrossedIcon } from 'lucide-react'
import { useSelector } from "react-redux"
import { Link } from "react-router"
import ProfileImage from "./ui/profileImage"
  

export default function Navbar() {
    const user = useSelector((state:RootState) => state.user)
    return (
        <nav className="lg:w-[10vw] min-w-[100px] h-full rounded-2xl bg-(--soft-blush-pink) hidden lg:flex flex-col items-center justify-between border border-(--light-gray)  ">
            <div className="flex flex-col items-center h-[15%] gap-4 lg:gap-8 borde justify-between ">
                <img className="w-20 aspect-square mt-2 rounded-3xl bg-amber-50 mx-auto" src="/assets/zestify-full.svg" alt="" />
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger><Heart className="w-9 h-9 text-(--zesty-orange) hover:fill-red-300 "/></TooltipTrigger>
                        <TooltipContent>
                        <p className="text-lg">Favorites</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

            </div>
            <div className="flex flex-col h-[30%] justify-between ">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger><HomeIcon className="w-9 h-9 text-(--zesty-orange) hover:fill-red-300 "/></TooltipTrigger>
                        <TooltipContent>
                        <p className="text-lg">Home</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger><UtensilsCrossedIcon className="w-9 h-9 text-(--zesty-orange) hover:fill-red-300 "/></TooltipTrigger>
                        <TooltipContent>
                        <p className="text-lg">Recipes</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger><LibraryBigIcon className="w-9 h-9 text-(--zesty-orange) hover:fill-red-300 "/></TooltipTrigger>
                        <TooltipContent>
                        <p className="text-lg">Categories</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger><SearchIcon className="w-9 h-9 text-(--zesty-orange) hover:fill-red-300 "/></TooltipTrigger>
                        <TooltipContent>
                        <p className="text-lg">Search for recipe</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className="flex flex-col borde h-[15%] justify-between items-center">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                                <Link to={'/add-recipe'}>
                                    <PlusIcon className="w-9 h-9 text-(--zesty-orange) hover:fill-red-300 "/>
                                </Link>
                            </TooltipTrigger>
                        <TooltipContent>
                            <p className="text-lg">Submit Recipe</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {!user.email && 
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger>
                                <Link to={'/auth/login'}>
                                    <UserCircle className="w-12 h-12 text-(--zesty-orange)hover:fill-red-300 "/>
                                </Link>
                            </TooltipTrigger>
                            <TooltipContent>
                            <p className="text-lg">Signup / Login</p>
                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                }

                {
                    user.email && 
                        <ProfileImage width={70} height={70} profilePicture={user.profilePicture}/>
                }

            </div>
        </nav>
    )
}