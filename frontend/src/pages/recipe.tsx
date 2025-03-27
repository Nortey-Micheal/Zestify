import useGetRecipeById from "@/hooks/recipes/useGetRecipeById"
import { setRecipePage } from "@/redux/recipe/recipePageSlice"
import { RootState } from "@/redux/store"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router"

export default function Recipe() {
    const recipe_id = useParams<{recipe_id:string}>()
    const recipe = useSelector((state:RootState) => state.recipePage)
    const newRecipes = useSelector((state:RootState) => state.newRecipes)
    const popularRecipes = useSelector((state:RootState) => state.popularRecipes)
    const { getRecipeById } = useGetRecipeById()
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchRecipe = async () => {
           const recipeFromNew = newRecipes.find(recipe => recipe_id.recipe_id === recipe._id)
           let recipeFromPopular;

           if (!recipeFromNew) {
                recipeFromPopular = popularRecipes.find(recipe => recipe_id.recipe_id === recipe._id)
           } else {
                dispatch(setRecipePage(recipeFromNew))
           }

           if (!recipeFromPopular || !recipeFromNew){
                await getRecipeById(recipe_id.recipe_id!)
                console.log(recipeFromNew, recipeFromPopular)
           } else {
                dispatch(setRecipePage(recipeFromPopular))
           }
           
        }
        fetchRecipe()
    },[])

    return (
        <section>
            <h1>{recipe?.title}</h1>
        </section>
    )
}