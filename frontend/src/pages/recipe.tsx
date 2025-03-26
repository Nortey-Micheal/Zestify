import useGetRecipeById from "@/hooks/recipes/useGetRecipeById"
import { RootState } from "@/redux/store"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import { useParams } from "react-router"

export default function Recipe() {
    const recipe_id = useParams<{recipe_id:string}>()
    const recipe = useSelector((state:RootState) => state.recipePage)
    const { getRecipeById } = useGetRecipeById()

    useEffect(() => {
        const fetchRecipe = async () => {
            alert(recipe_id)
            await getRecipeById(recipe_id.recipe_id!)
        }
        fetchRecipe()
    },[])

    return (
        <section>
            <h1>{recipe?.title}</h1>
        </section>
    )
}