import RecipeCard from "@/components/recipeCard"
import useGetPopularRecipes from "@/hooks/recipes/useGetPopularRecipes"
import { RootState } from "@/redux/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export default function PopularRecipes() {
    const popularRecipes = useSelector((state:RootState) => state.popularRecipes)
    const { getPopularRecipes } = useGetPopularRecipes()

    useEffect(() => {
        const fetchRecipe = async() => {
            await getPopularRecipes()
        }
        fetchRecipe()
    },[])

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
        </section>
    )
}