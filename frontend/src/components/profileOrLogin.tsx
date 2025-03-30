import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { UserCircle } from "lucide-react";
import { Link } from "react-router";
import ProfileImage from "./ui/profileImage";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

export default function ProfileOrLogin({display}:any) {
    const user = useSelector((state:RootState) => state.user)

    return (
        <div className={`${display}`}>
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
    )
}