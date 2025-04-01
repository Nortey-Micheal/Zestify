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
        <nav className="lg:w-[10vw] min-w-fit px-2 h-full rounded-2xl bg-(--rose-white) hidden lg:flex flex-col items-center justify-between border border-(--light-gray) ml-3 ">
            <div className="flex flex-col items-center h-[15%] gap-4 lg:gap-8 borde justify-between ">
                <img className="w-20 aspect-square mt-2 rounded-3xl bg-amber-50 mx-auto" src="/assets/zestify-full.svg" alt="" />
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="flex items-center gap-2  "><Heart className="w-9 h-9 text-(--dark-raspberry) hover:fill-red-300 "/><p className="text-lg">Favorites</p> </TooltipTrigger>
                        <TooltipContent>
                        <p className="text-lg">Favorites</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>

            </div>
            <div className="flex flex-col h-[30%] justify-between ">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger><Link to={'/'} className="flex items-center gap-2">
                            <HomeIcon className="w-9 h-9 text-(--dark-raspberry) hover:fill-red-300 "/> <p className="text-lg">Home</p>
                        </Link> </TooltipTrigger>
                        <TooltipContent>
                        <p className="text-lg">Home</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger><Link to={'/recipes'} className="flex items-center gap-2">
                            <UtensilsCrossedIcon className="w-9 h-9 text-(--dark-raspberry) hover:fill-red-300 "/><p className="text-lg">Recipes</p>
                        </Link> </TooltipTrigger>
                        <TooltipContent>
                        <p className="text-lg">All Recipes</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger><Link className="flex items-center gap-2" to={'/category'}>
                            <LibraryBigIcon className="w-9 h-9 text-(--dark-raspberry) hover:fill-red-300 "/> <p className="text-lg">Categories</p>
                        </Link> </TooltipTrigger>
                        <TooltipContent>
                        <p className="text-lg"> All Categories</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger className="flex items-center gap-2"><SearchIcon className="w-9 h-9 text-(--dark-raspberry) hover:fill-red-300 "/> <p className="text-lg">Search</p> </TooltipTrigger>
                        <TooltipContent>
                        <p className="text-lg">Search for recipe</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
            </div>
            <div className="flex flex-col borde h-[15%] justify-between mb-3 items-center">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                                <Link to={'/add-recipe'} className=" flex items-center gap-2">
                                    <PlusIcon className="w-9 h-9 text-(--dark-raspberry) hover:fill-red-300 "/>
                                    <p className="text-lg">Add Recipe</p>
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
                            <TooltipTrigger className="w-full">
                                <Link to={'/auth/login'} className="flex items-center gap-2">
                                    <UserCircle className="w-12 h-12 text-(--dark-raspberry) hover:fill-red-300 "/>
                                    <p className="text-lg">Login</p>
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