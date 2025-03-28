import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { RootState } from "@/redux/store"
import { MenuIcon, UserCircle } from "lucide-react"
import { useSelector } from "react-redux"
import ProfileImage from "./ui/profileImage"
import { useEffect, useRef, useState } from "react"
import { Link } from "react-router"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"

export function NavbarSmallScreen() {
    const user = useSelector((state:RootState) => state.user)

    const [visible, setVisible] = useState(true);

    const scrollContainerRef = useRef<HTMLDivElement | null>(null);

    useEffect(() => {
        const scrollContainer = document.querySelector("section"); // Target the section directly
        if (!scrollContainer) return;

        let lastScrollY = scrollContainer.scrollTop;

        const handleScroll = () => {
            const currentScrollY = scrollContainer.scrollTop;
            setVisible(currentScrollY <= lastScrollY); // Detects up/down scroll
            lastScrollY = currentScrollY;
        };

        scrollContainer.addEventListener("scroll", handleScroll);
        return () => scrollContainer.removeEventListener("scroll", handleScroll);
    }, []);

  return (
    <nav className={`flex lg:hidden z-50 justify-between items-center sticky top-0 transition-transform ${visible ? 'translate-y-0' : '-translate-y-full'} bg-(--rose-white) w-[100vw] px-5 py-2 -ml-5`}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <MenuIcon className="w-9 h-9 text-(--zesty-orange)"/>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>
                Profile
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Billing
                <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Settings
                <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
              </DropdownMenuItem>
              <DropdownMenuItem>
                Keyboard shortcuts
                <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem>Team</DropdownMenuItem>
              <DropdownMenuSub>
                <DropdownMenuSubTrigger>Invite users</DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent>
                    <DropdownMenuItem>Email</DropdownMenuItem>
                    <DropdownMenuItem>Message</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>More...</DropdownMenuItem>
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
              <DropdownMenuItem>
                New Team
                <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem>GitHub</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuItem disabled>API</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              Log out
              <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <img className="w-14 " src="/assets/zestify-full.svg" alt="" />
        {
            user.name ? <ProfileImage profilePicture={user.profilePicture} width={70} height={70}/> : <TooltipProvider>
            <Tooltip>
                <TooltipTrigger className="w-ful">
                    <Link to={'/auth/login'} className="flex items-center gap-2">
                        <UserCircle className="w-12 h-12 text-(--zesty-orange) hover:fill-red-300 "/>
                        <p className="text-xl">Login</p>
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
