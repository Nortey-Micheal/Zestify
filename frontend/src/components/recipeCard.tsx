import { Recipe } from "@/redux/recipe/recipeSlice";
import ProfileImage from "./ui/profileImage";
import RecipeImage from "./ui/recipeImage";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { BookmarkIcon, ThumbsUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router";

interface RecipeCardType {
    recipe: Recipe
}

export default function RecipeCard({recipe}:RecipeCardType) {
    return (
        <div className={`p-3 border-(--light-gray) w-full md:max-w-[500px] shadow-xl border flex flex-col rounded-2xl text-(--deep-charcoal) bg-(--white) mx-auto `} key={recipe.author + recipe.title}>
            <div className="flex  gap-5 mb-3">
                <div className="w-15 h-15 overflow-hidden rounded-full border">
                    <ProfileImage profileImage={recipe.authorPic} width={200} height={200} />
                </div>
                <div>
                    <p className="border-b-2 mb-1">{recipe.author}</p>
                    <p>Posted: {recipe.cookTime} mins</p>
                </div>
            </div>
            <div className="rounded-t-2xl overflow-clip border min-h-[200px] flex items-center justify-center  h-fit relative w-full ">
                <RecipeImage width={500} height={500} image={recipe.image} />
                <div className="absolute top-0 flex p-1   
                    w-10 h-10 right-8 ">
                    <div className="bg-(--light-grey) w-15 h-15 rounded-full p-5 flex items-center justify-center mt-1" aria-label="Add to favourite">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger className="flex items-center gap-2"> <BookmarkIcon className="  drop-shadow-lg
                        w-18 h-8  font-extrabold hover:fill-(--zesty-orange) "/></TooltipTrigger>
                                <TooltipContent>
                                <p className="text-lg p-2 rounded-xl bg-(--dark-charcoal) text-(--white) ">Add to favourites</p>
                                </TooltipContent>
                            </Tooltip>
                        </TooltipProvider>
                    </div>
                </div>
            </div>
            <div className=" flex flex-col justify-between my-2 ">
                <h2 className="text-2xl font-semibold font-[young-serif] ">{recipe.title}</h2>
                <p>Cook Time: {recipe.cookTime} mins</p>
            </div>
            <div className="">
                <Button onClick={() => alert('Hello')}  className="flex items-center gap-2 border p-2 mb-3 w-15 rounded-xl bg-(--white) text-(--dark-charcoal) hover:bg-(--light-grey) ">
                    <ThumbsUpIcon rotate={''}/>
                    <p>{recipe.likes}</p>
                </Button>
            </div>
            <Link to={`/recipe/${recipe._id}`} className="bg-(--zesty-orange) md:text-xl text-lg hover:bg-(--rich-brown) rounded-lg text-center text-(--white) py-1 ">View Recipe</Link>
        </div>
    )
}