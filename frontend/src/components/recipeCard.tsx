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
import useLikeRecipe from "@/hooks/recipes/useLikeRecipe";

interface RecipeCardType {
    recipe: Recipe
}

export default function RecipeCard({recipe}:RecipeCardType) {
    const { bookmarkRecipe, success, error, isLoading, removeBookmarkRecipe} = useBookmarkRecipe()
    const {likeError, isLiking, likeRecipe,unLikeRecipe } = useLikeRecipe()
    const user = useSelector((state:RootState) => state.user)
    const [bookmark,setBookmark] =  useState<boolean>(false)
    const [like,setLike] = useState<boolean>(false)

    //handle bookmarking of recipes
    async function handleBookmarking () {
        
        if(!user?.email) {
            toast.error('You need to be logged in to bookmark a recipe')
            return
        }
        
        if (user?.email && !bookmark) {
            await bookmarkRecipe(user?.email,recipe)
            if (error) {
                setBookmark(false)
                return
            }
            setBookmark(true)
            toast.success(`${recipe.title} by ${recipe.author} has been added to bookmark`)
        } 

        if (user?.email && bookmark) {
            await removeBookmarkRecipe(user?.email,recipe)
            if (error) {
                setBookmark(true)
                return
            }
            setBookmark(false)
            toast.info(`${recipe.title} by ${recipe.author} has been removed from bookmark`)
        }
    }

    //handle liking of recipes
    async function handleLiking () {

        if(!user?.email) {
            toast.error('You need to be logged in to like a recipe')
            return
        }

        if (!like) {
            await likeRecipe(recipe._id,user?.email)
            if (likeError) {
                setLike(false)
                return

            }
            setLike(true)
            toast.success(`You liked ${recipe.title} by ${recipe.author}.`)
        }
        if (like) {
            await unLikeRecipe(recipe._id,user?.email)
            if (likeError) {
                setLike(true)
                return
            }
            setLike(false)
            toast.info(`You unliked ${recipe.title} by ${recipe.author}.`)
        }
    }

    useEffect(() =>{
        //check if recipe is already liked
        const checkLiking = () => {
            const likedRecipe = recipe.likes.by.find(liker => liker === user?.email)
            if (likedRecipe) {
                setLike(true)
            } else {
                setLike(false) // remove like 
            }
        }
        checkLiking()
    
    },[recipe.likes.by.length])

    useEffect(() => {
        //check if recipe is already bookmarked
        const checkBooking = () => {
            if (user.favouriteRecipes) {
                    const bookedRecipe = user?.favouriteRecipes.find(favoriteRecipes => recipe._id === favoriteRecipes._id)
                if (bookedRecipe) {
                    setBookmark(true)
                } else {
                    setBookmark(false) // remove bookmark 
                }
            }
        }
        checkBooking()
    },[user,success])

    return (
        <div className={`p-3 border-(--light-gray) w-full md:max-w-[500px] shadow-xl border flex flex-col rounded-2xl text-(--deep-charcoal) bg-(--white) mx-auto `} >
            <div className="flex gap-5 mb-3">
                <div className="w-13 h-13 overflow-hidden rounded-full border flex items-center justify-center">
                    <ProfileImage profilePicture={recipe.authorPic || 'defaultProfile_ab13io'} width={50} height={50} />
                </div>
                <div>
                    <p className="border-b-2 mb-1">{(user?.email === recipe.author) || (user?.name === recipe.author) ? 'You' : recipe.author}</p>
                    <p className="text-slate-500 ">Posted: {recipe.cookTime} mins</p>
                </div>
            </div>
            <div className="rounded-t-2xl overflow-clip border min-h-[200px] flex items-center justify-center  h-fit relative w-full ">
                <RecipeImage width={500} height={500} image={recipe.image} />
                <div className="absolute top-0 flex p-1   
                    w-10 h-10 right-8 ">
                    <div className="bg-(--light-grey) w-15 h-15 rounded-full p-5 flex items-center justify-center mt-1" aria-label="Add to favourite">
                        <TooltipProvider>
                            <Tooltip>
                                <TooltipTrigger disabled={isLoading} onClick={handleBookmarking} className="flex items-center gap-2"> 
                                    <BookmarkIcon className={` ${bookmark ? 'fill-(--zesty-orange) hover:fill-(--zesty-orange) ' : 'hover:fill-(--rose-white)'} drop-shadow-lg w-18 h-8  font-extrabold cursor-pointer `} />
                                </TooltipTrigger>
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
                <Button onClick={handleLiking} disabled={isLiking}  className={`flex items-center cursor-pointer gap-2 border p-2 mb-3 w-15 rounded-xl ${like ? 'bg-(--success-green) text-(--white) hover:bg-(--success-green) ' : 'bg-(--white) text-(--dark-charcoal) hover:bg-(--light-grey)'} `}>
                    <ThumbsUpIcon/>
                    <p>{recipe.likes.value}</p>
                </Button>
            </div>
            <Link to={`/recipe/${recipe._id}`} className="bg-(--zesty-orange) md:text-xl text-lg hover:bg-(--rich-brown) rounded-lg text-center text-(--white) py-1 ">View Recipe</Link>
        </div>
    )
}