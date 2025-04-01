import RecipeCard from "@/components/recipeCard"
import useGetPopularRecipes from "@/hooks/recipes/useGetPopularRecipes"
import { RootState } from "@/redux/store"
import { ArrowBigLeftDashIcon, ArrowBigRightDashIcon } from "lucide-react"
import { useEffect, useState } from "react"
import { useSelector } from "react-redux"

export default function PopularRecipes() {
    const popularRecipes = useSelector((state:RootState) => state.popularRecipes)
    const { getPopularRecipes } = useGetPopularRecipes()
    const [page,setPage] = useState<number>(1)

    useEffect(() => {
        const fetchRecipe = async() => {
            await getPopularRecipes(page)
        }
        fetchRecipe()
    },[page])

    return (
        <section className="  ">
            <h2 className="mb-3">Popular Recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  gap-y-10">
                {
                    popularRecipes.map(recipe => (
                        <RecipeCard recipe={recipe}/>
                    ))
                }
            </div>
            <ul className="w-full flex justify-center m-2 mt-10 bg-(--white) mx-auto rounded-lg gap-30 ">
                <li>
                    <button disabled={page === 1} className="flex items-center gap-2 text-xl hover:bg-(--zesty-orange) hover:text-(--white) font-bold cursor-pointer rounded-lg disabled:bg-(--light-gray) px-2 my-1 disabled:text-(--light-grey) " onClick={() => setPage(prev => Math.max((prev - 1), 1))}><ArrowBigLeftDashIcon /> Prev</button>
                </li>
                <li>
                    <button className="flex items-center gap-2 text-xl hover:bg-(--zesty-orange) hover:text-(--white) font-bold cursor-pointer rounded-lg disabled:bg-(--light-gray) px-2 my-1 disabled:text-(--light-grey) " disabled={popularRecipes.length < 6} onClick={() => setPage(prev => Math.max((prev + 1), 1))}>Next
                    <ArrowBigRightDashIcon />
                    </button>
                </li>
            </ul>
        </section>
    )
}