import Navbar from "@/components/navbar"
import { NavbarSmallScreen } from "@/components/navbarSmallScreen"
import ProfileOrLogin from "@/components/profileOrLogin"
import RecipeCard from "@/components/recipeCard"
import SearchBar from "@/components/ui/searchBar"
import useSearchRecipe from "@/hooks/recipes/useSearchRecipe"
import { removeSearchRecipes } from "@/redux/recipe/searchRecipe"
import { RootState } from "@/redux/store"
import { ArrowBigLeftDashIcon, ArrowBigRightDashIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Toaster } from "sonner"

export default function SearchRecipes() {
    const searchedRecipes = useSelector((state:RootState) => state.searchRecipes)
    const [page,setPage] = useState<number>(1)
    const { isSearching } = useSearchRecipe()
    const dispatch = useDispatch()

    useEffect(() => {
        return () => {
            dispatch(removeSearchRecipes())
        }
    },[])

    return (
        <div className="lg:h-[100vh] lg:py-5 lg:flex ">
            <Navbar />
            <Toaster richColors position="top-center"/>
            <NavbarSmallScreen />
            <section className="lg:ml-5 w-[95vw] mx-auto lg:h-[100vh] overflow-scroll pb-10 ">
                <div className="flex justify-between w-[90vw] lg:w-[80vw] items-center pt-2 borde">
                    <SearchBar page={page} placeholder={'Search for a recipe using title or ingredient'} className='w-[100%] mx-auto lg:mx-0 lg:w-[50%] '/>
                    <ProfileOrLogin display='hidden lg:block'/>
                </div>
                {
                   (searchedRecipes.length > 0) && <div className="mt-10 borde lg:w-[80vw] ">
                        <div className="flex items-center justify-between">
                            <p> Searched Recipes</p>
                        </div>
                        <div className="bg-(--rose-white) grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 lg:px-5 px-2 py-1 lg:py-3 gap-y-8 gap-x-4 p-2 rounded-xl w-[95vw] lg:w-[80vw] mx-auto mt-5 ">
                            {
                                searchedRecipes.map(recipe => (
                                    <RecipeCard recipe={recipe} key={recipe._id}/>
                                ))
                            }
                        </div>
                    </div>
                }
                <ul className="w-full flex justify-center m-2 mt-10 bg-(--white) mx-auto rounded-lg gap-30 ">
                    <li>
                        <button disabled={page === 1} className="flex items-center gap-2 text-xl hover:bg-(--zesty-orange) hover:text-(--white) font-bold cursor-pointer rounded-lg disabled:bg-(--light-gray) px-2 my-1 disabled:text-(--light-grey) " onClick={() => setPage(prev => Math.max((prev - 1), 1))}><ArrowBigLeftDashIcon /> Prev</button>
                    </li>
                    <li>
                        <button className="flex items-center gap-2 text-xl hover:bg-(--zesty-orange) hover:text-(--white) font-bold cursor-pointer rounded-lg disabled:bg-(--light-gray) px-2 my-1 disabled:text-(--light-grey) " disabled={(searchedRecipes.length < 6) || isSearching} onClick={() => setPage(prev => Math.max((prev + 1), 1))}>Next
                        <ArrowBigRightDashIcon />
                        </button>
                    </li>
                </ul>
            </section>
        </div>
    )
}