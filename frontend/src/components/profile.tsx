import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { BellIcon, SettingsIcon, User2Icon } from "lucide-react";

export default function Profile() {
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
                        <TooltipTrigger><SettingsIcon className="w-9 h-9 text-red-900 hover:fill-red-300 "/></TooltipTrigger>
                        <TooltipContent>
                        <p className="text-lg">Settings</p>
                        </TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                </div>
                <div className="w-full flex flex-col justify-center items-center mt-10">
                    <img className="h-20 w-20 rounded-full bg-red-50" src="" alt="" />
                    <p>UserName</p>
                </div>
            </div>
            <div>
                <p>My recipes</p>
                {
                    //User's recipes
                }
            </div>

        </section>
    )
}