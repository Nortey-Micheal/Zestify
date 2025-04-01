import Profile from "@/components/profile";
import withAuth from "../withAuth";
import { ArrowBigLeftDashIcon } from "lucide-react";
import { Link } from "react-router";
import useBookmarkRecipe from "@/hooks/users/useBookmarkRecipe";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useEffect } from "react";

function ProfilePage() {
    const user = useSelector((state:RootState) => state.user)
    const { getUserFavorites, success } = useBookmarkRecipe()

    useEffect(() => {
        const fetchFavoriteRecipes = async () => {
            await getUserFavorites(user.email)
        }
        fetchFavoriteRecipes()
    },[success])
    
    return (
        <section className="w-[100vw] min-h-[100vh] flex items-center justify-center ">
            <Link to={'/'}  className="flex z-30 items-center fixed top-3 left-3 bg-(--zesty-orange) rounded-xl px-3 py-1 text-(--rose-white) "><ArrowBigLeftDashIcon /> <span className="hidden md:block">Back</span></Link>

            <Profile display="block" width='w-[50vw] ' className='min-h-[90vh] w-[90vw] ' />
        </section>
    )
}

export default withAuth(ProfilePage)