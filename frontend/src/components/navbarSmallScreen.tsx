import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RootState } from "@/redux/store"
import { HeartIcon, HomeIcon, LibraryBigIcon, LogInIcon, LogOutIcon, MenuIcon, MenuSquare, Plus, SearchIcon, Settings, User2, UserCircle } from "lucide-react"
import { useSelector } from "react-redux"
import ProfileImage from "./ui/profileImage"
import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"
import useLogOut from "@/hooks/users/useLogout"

export function NavbarSmallScreen() {
    const user = useSelector((state:RootState) => state.user)
    const { logout } = useLogOut()
    const navigate = useNavigate()

    const [visible, setVisible] = useState(true);
    let lastScrollY = window.scrollY;
  
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setVisible(false); // Scrolling down
      } else {
        setVisible(true); // Scrolling up
      }
      lastScrollY = window.scrollY;
    };
  
    useEffect(() => {
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }, []);

  return (
    <nav className={`flex lg:hidden z-50 justify-between items-center sticky top-0 transition-transform ${visible ? 'translate-y-0' : '-translate-y-full'} bg-(--rose-white) mx-auto w-[100vw] px-2 py-2 `}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MenuIcon className="w-9 h-9 text-(--zesty-orange) cursor-pointer"/>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 ml-2">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate('/')} className="focus:bg-(--zesty-orange) focus:text-(--white) cursor-pointer "><HomeIcon className="text-[inherite]"/> Home</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/recipes')} className="focus:bg-(--zesty-orange) focus:text-(--white) cursor-pointer "><MenuSquare className="text-[inherite]"/> All recipes</DropdownMenuItem>
              <DropdownMenuItem onClick={() => navigate('/recipe-search')} className="focus:bg-(--zesty-orange) focus:text-(--white) cursor-pointer ">
                <SearchIcon className="text-[inherite]"/> Search
                <DropdownMenuShortcut className="text-[inherite]">⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => navigate('/categories')} className="focus:bg-(--zesty-orange) focus:text-(--white) cursor-pointer "><LibraryBigIcon className="text-[inherite]"/> Categories</DropdownMenuItem>
            <DropdownMenuItem onClick={() => navigate('/profile')} className="focus:bg-(--zesty-orange) focus:text-(--white) cursor-pointer "><HeartIcon className="text-[inherite]"/> Favorites</DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-(--zesty-orange) focus:text-(--white) cursor-pointer " onClick={() => navigate('/add-recipe')} ><Plus className="text-[inherite]"/> Submit recipe</DropdownMenuItem>

            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => navigate('/profile')} className="focus:bg-(--zesty-orange) focus:text-(--white) cursor-pointer ">
                 <User2 className="text-[inherite]"/> Profile
                <DropdownMenuShortcut className="text-[inherite]">⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem className="focus:bg-(--zesty-orange) focus:text-(--white) cursor-pointer ">
                <Settings className="text-[inherite]"/> Settings
                <DropdownMenuShortcut className="text-[inherite]">⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            { user.email && <DropdownMenuItem className="focus:bg-(--zesty-orange) focus:text-(--white) cursor-pointer " onClick={() => logout()}>
                  <LogOutIcon className="text-[inherite]"/> Log out
                  <DropdownMenuShortcut className="text-[inherite]">⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            }
            {
              !user.email && <DropdownMenuItem className="focus:bg-(--zesty-orange) focus:text-(--white) cursor-pointer " onClick={() => navigate('/auth/login')}>
                  <LogInIcon className="text-[inherite]"/> Log In
                  <DropdownMenuShortcut className="text-[inherite]">⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
            }
          </DropdownMenuContent>
        </DropdownMenu>
        <img onClick={() => navigate('/')} className="w-11 cursor-pointer " src="/assets/zestify-full.svg" alt="" />
        {
            user.name ? <Link to={'/profile'}>
              <ProfileImage profilePicture={user.profilePicture} width={50} height={50}/>
            </Link> : <TooltipProvider>
              <Tooltip>
                  <TooltipTrigger className="mr-2">
                      <Link to={'/auth/signup'} className="flex items-center gap-2 cursor-pointer">
                          <UserCircle className="w-10 h-10 text-(--zesty-orange) focus:fill-red-300 "/>
                          <p className="text-xl">Sign up</p>
                      </Link>
                  </TooltipTrigger>
                  <TooltipContent>
                  <p className="text-lg">Signup / Login</p>
                  </TooltipContent>
              </Tooltip>
          </TooltipProvider>
        }
    </nav>
  )
}
