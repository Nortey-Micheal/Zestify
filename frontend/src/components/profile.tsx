import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { BellIcon, LogOutIcon, PlusCircleIcon } from "lucide-react";
import ProfileImage from "./ui/profileImage";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useNavigate } from "react-router";
import useLogOut from "@/hooks/useLogout";

export default function Profile() {
    const user = useSelector((state:RootState) => state.user)
    const navigate = useNavigate()
    const { logout } = useLogOut()

    return (
        <section className="w-[25vw] border-2 border-black rounded-2xl p-3">

            <div>
                <div className="flex w-full justify-between">
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger><BellIcon className="w-9 h-9 text-red-900 hover:fill-red-300 "/></TooltipTrigger>
                        <TooltipContent>
                        <p className="text-lg">Notifications</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger>
                            <LogOutIcon onClick={() => logout()} className="w-9 h-9 text-red-900 hover:fill-red-300 "/>
                        </TooltipTrigger>
                        <TooltipContent>
                        <p className="text-lg">Log Out</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                </div>
                <div className="w-full flex flex-col justify-center items-center mt-10">
                    <ProfileImage width={170} height={170} profilePicture={user.profilePicture}/>
                    <p className="text-slate-700 text-3xl font-bold">{user.name}</p>
                </div>
            </div>
            <div className="my-5 flex justify-between">
                <p className=" text-xl">My recipes</p>
                <button className="cursor-pointer" onClick={() => navigate('/add-recipe')}>
                    <PlusCircleIcon className="w-9 h-9"/>
                </button>
            </div>

        </section>
    )
}