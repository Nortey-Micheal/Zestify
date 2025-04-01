import { Recipe } from "@/redux/recipe/recipeSlice";
import ProfileImage from "./ui/profileImage";
import RecipeImage from "./ui/recipeImage";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip";
import { BookmarkIcon, ThumbsUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import { Link } from "react-router";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import useBookmarkRecipe from "@/hooks/users/useBookmarkRecipe";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";

interface RecipeCardType {
    recipe: Recipe
}

export default function RecipeCard({recipe}:RecipeCardType) {
    const { bookmarkRecipe, success, error, isLoading, removeBookmarkRecipe} = useBookmarkRecipe()
    const user = useSelector((state:RootState) => state.user)
    const [bookmark,setBookmark] =  useState<boolean>(false)
    const [like,setLike] = useState<boolean>(false)

    // const [recipeLikes,setRecipeLikes] = useState<number>(recipe.likes)

    async function handleBookmarking () {

        console.log(like)
        if(!user.email) {
            toast.error('You need to be logged in to bookmark a recipe')
            return
        }
        
        if (user.email && !bookmark) {
            toast.success(`${recipe.title} by ${recipe.author} has been added to bookmark`)
            await bookmarkRecipe(user.email,recipe)
            if (error) {
                setBookmark(false)
            }
            setBookmark(true)
            return
        } 

        if (user.email && bookmark) {
            toast.info(`${recipe.title} by ${recipe.author} has been removed from bookmark`)
            await removeBookmarkRecipe(user.email,recipe)
            if (error) {
                setBookmark(true)
            }
            setBookmark(false)
            return
        }
    }

    function handleLiking () {
        if (!like) {
            toast.success(`You liked ${recipe.title} by ${recipe.author}.`)
            setLike(true)
            return
        }
        if (like) {
            toast.info(`You unliked ${recipe.title} by ${recipe.author}.`)
            setLike(false)
            return
        }
    }

    // useEffect(() =>{
        
        
    // },[like])

    user.favouriteRecipes && useEffect(() => {
        const checkBooking = () => {
            const bookedRecipe = user.favouriteRecipes.find(favoriteRecipes => recipe._id === favoriteRecipes._id)

            if (bookedRecipe) {
                setBookmark(true)
            }
        }
        checkBooking()
    },[user.favouriteRecipes.length,success])

    return (
        <div className={`p-3 border-(--light-gray) w-full md:max-w-[500px] shadow-xl border flex flex-col rounded-2xl text-(--deep-charcoal) bg-(--white) mx-auto `} >
            <div className="flex  gap-5 mb-3">
                <div className="w-15 h-15 overflow-hidden rounded-full border">
                    <ProfileImage profilePicture={recipe.authorPic} width={70} height={70} />
                </div>
                <div>
                    <p className="border-b-2 mb-1">{(user.email === recipe.author) || (user.name === recipe.author) ? 'You' : recipe.author}</p>
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
                                <TooltipTrigger> <button disabled={isLoading} onClick={() => handleBookmarking()} className="flex items-center gap-2">
                                    <BookmarkIcon className={` ${bookmark ? 'fill-(--zesty-orange) hover:fill-(--zesty-orange) ' : 'hover:fill-(--rose-white)'} drop-shadow-lg w-18 h-8  font-extrabold cursor-pointer `} />
                                </button></TooltipTrigger>
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
                <Button onClick={() => handleLiking()}  className={`flex items-center cursor-pointer gap-2 border p-2 mb-3 w-15 rounded-xl ${like ? 'bg-(--success-green) text-(--white) hover:bg-(--success-green) ' : 'bg-(--white) text-(--dark-charcoal) hover:bg-(--light-grey)'} `}>
                    <ThumbsUpIcon rotate={''}/>
                    <p>{recipe.likes}</p>
                </Button>
            </div>
            <Link to={`/recipe/${recipe._id}`} className="bg-(--zesty-orange) md:text-xl text-lg hover:bg-(--rich-brown) rounded-lg text-center text-(--white) py-1 ">View Recipe</Link>
        </div>
    )
}