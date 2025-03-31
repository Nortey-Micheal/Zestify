import RecipeCard from "@/components/recipeCard"
import useGetNewRecipes from "@/hooks/recipes/useGetNewRecipes"
import { RootState } from "@/redux/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"

export default function NewRecipes() {
    const newRecipes = useSelector((state:RootState) => state.newRecipes)
    const { getNewRecipes } = useGetNewRecipes()

    useEffect(() => {
        const fetchRecipe = async() => {
            await getNewRecipes()
        }
        fetchRecipe()
    },[])

    return (
        <section className="">
            <h2 className="mb-3">Newest Recipes</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  gap-y-10">
            {
                newRecipes.map(recipe => (
                    <RecipeCard recipe={recipe}/>
                ))
            }
            </div>
        </section>
    )
}