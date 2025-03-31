import Profile from "@/components/profile";
import withAuth from "../withAuth";

function ProfilePage() {
    return (
        <section className="w-[100vw] h-[100vh] flex items-center justify-center ">
            <Profile />
        </section>
    )
}

export default withAuth(ProfilePage)