import { BellIcon, SettingsIcon } from "lucide-react";

export default function Profile() {
    return (
        <section className="w-[30vw] border-2 border-black rounded-2xl">

            <div>
                <div>
                    <BellIcon />
                    <SettingsIcon />
                </div>
                <div>
                    <img src="" alt="" />
                    <p>UserName</p>
                </div>
            </div>
            <div></div>
            <div></div>
            <div></div>

        </section>
    )
}