import Categories from "@/components/categories";
import Navbar from "@/components/navbar";
import Profile from "@/components/profile";

export default function Home() {
    return (
        <div className="max-w-[1300px w-[95vw] py-5 h-[100vh] mx-auto flex gap-5 ">
            <Navbar />
            <Categories />
            <Profile />
        </div>
    )
}