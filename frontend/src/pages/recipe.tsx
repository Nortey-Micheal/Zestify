import RecipeImage from "@/components/ui/recipeImage"
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

           if (!recipeFromPopular && !recipeFromNew){
                await getRecipeById(recipe_id.recipe_id!)
                console.log(recipeFromNew, recipeFromPopular)
           } else {
                dispatch(setRecipePage(recipeFromPopular!))
           }
           
        }
        fetchRecipe()
    },[])

    return (
        <section className=" py-5 bg-(--eggshell) text-(--deep-charcoal) text-xl/relaxed ">
            <div className="bg-(--white) w-[100vw] md:max-w-[800px] mx-auto md:p-8 p-3 mb-10 rounded-2xl ">
                <div className="w-[95vw] mx-auto md:w-full rounded-2xl bg-(--dark-green) overflow-hidden flex justify-center items-center">
                    <RecipeImage width={760} height={450} image={recipe.image} />
                </div>
                <div className="mt-7">
                    <div className=" mb-5">
                        <div className="mb-4 flex justify-between items-center">
                            <h1 className="text-3xl md:text-5xl font-[young-serif] font-extrabold">{recipe.title}</h1>
                            <p className="text-lg bg-(--dark-raspberry) text-(--rose-white) p-2 rounded-2xl">by:&nbsp; <span className="font-extrabold text-xl text-(--rose-white) md:text-3xl font-[young-serif]">{recipe.author}</span></p>
                        </div>
                        <p className="text-xl/relaxed">{recipe.description}</p>
                    </div>
                    <div className="bg-(--rose-white) p-5 rounded-xl ">
                        <h4 className="text-(--dark-raspberry) mb-3 text-2xl md:text-3xl font-bold font-[young-serif] ">Preparation time</h4>
                        <ul className="list-disc list-inside pl-5 ">
                            <li className="mb-1 md:mb-3"><span className="font-bold">Total</span>: Approximately {recipe.cookTime * 1.3} minutes</li>
                            <li className="mb-1 md:mb-3"><span className="font-bold">Preparation</span>: {recipe.cookTime * 0.3} minutes</li>
                            <li ><span className="font-bold">Cooking</span>: {recipe.cookTime} minutes</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-12  border-b-3 pb-8 border-(--light-grey) ">
                    <h2 className="text-(--nutmeg) mb-6 text-2xl md:text-3xl font-bold font-[young-serif] ">Ingredients</h2>
                    <ul className="flex flex-col gap-3 md:gap-8 list-disc list-outside ml-5 ">
                        {
                            recipe.ingredients.map(ingredient => (
                                <li key={ingredient.id} className="indent-5">{ingredient.value}</li>
                            ))
                        }
                    </ul>                    
                </div>
                <div className="mt-5 border-b-3 pb-8 border-(--light-grey) ">
                    <h2 className="text-(--nutmeg) mb-6 text-2xl md:text-3xl font-bold font-[young-serif] ">Instructions</h2>
                    <ol className="list-decimal list-outside ml-5 flex flex-col gap-3 md:gap-4">
                        {
                            recipe.instructions.map(instruction => (
                                <li key={instruction.id} className="indent-5">{instruction.value}</li>
                            ))
                        }
                    </ol>
                </div>
            </div>
        </section>
    )
}