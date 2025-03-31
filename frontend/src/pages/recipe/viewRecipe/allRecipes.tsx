import RecipeCard from "@/components/recipeCard"
import useGetAllRecipes from "@/hooks/recipes/useGetAllRecipes"
import { RootState } from "@/redux/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export default function AllRecipes() {
    const allRecipes = useSelector((state:RootState) => state.recipes)
    const { getAllRecipes } = useGetAllRecipes()

    useEffect(() => {
        const fetchRecipe = async () => {
            await getAllRecipes()
        }
        fetchRecipe()
        console.log(allRecipes.map(recipe => recipe.title))
    },[])

    return (
        <section>
            <h2 className="mb-3">All Recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  gap-y-10">
                {
                    allRecipes.map(recipe => (
                        <RecipeCard recipe={recipe}/>
                    ))
                }
            </div>
        </section>
    )
}