import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import useGetNewRecipes from "@/hooks/recipes/useGetNewRecipes"
import { RootState } from "@/redux/store"
import { ArrowBigRightDashIcon, ChefHatIcon, CookieIcon, DrumstickIcon, EggFriedIcon, Heart, IceCreamBowlIcon, LucideProps, SandwichIcon, WineIcon } from "lucide-react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import RecipeImage from "./ui/recipeImage"
import useGetPopularRecipes from "@/hooks/recipes/useGetPopularRecipes"
import { Button } from "./ui/button"
import { useNavigate } from "react-router"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"

interface Category {
    name: string,
    Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}

export default function Categories() {
    const user = useSelector((state:RootState) => state.user)
    const newRecipes = useSelector((state:RootState) => state.newRecipes)
    const popular = useSelector((state:RootState) => state.popularRecipes)
    const { getNewRecipes } = useGetNewRecipes()
    const { getPopularRecipes } = useGetPopularRecipes()
    const navigate = useNavigate()

    const categories:Category[] = [
        {
            name: "All",
            Icon: ChefHatIcon
        },
        {
            name: "Breakfast",
            Icon: EggFriedIcon
        },
        {
            name: "Lunch",
            Icon: SandwichIcon
        },
        {
            name: "Dinner",
            Icon: DrumstickIcon
        },
        {
            name: "Dessert",
            Icon: IceCreamBowlIcon
        },
        {
            name: "Snack",
            Icon: CookieIcon
        },
        {
            name: "Beverage",
            Icon: WineIcon
        }
    
    ]

    useEffect(() => {
        const fetchRecipes = async () => {
            await getPopularRecipes()
            await getNewRecipes()
        }
        fetchRecipes()
    },[])

    return (
        <section className={`px-3 py-5 h-[100vh] w-[90vw] mx-auto bg-(--rose-whit) overflow-scroll ${!user.email ? 'lg:w-[80vw]' : 'lg:w-[57vw]'}`}>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-(--zesty-orange) font-[young-serif] ">Welcome to Zestify</h1>
            <p className="text-3xl lg:text-4xl mt-2 font-extrabold text-(--deep-charcoal) ">Where recipes are shared and  <br /><span className="text-(--zesty-orange) font-[young-serif] "> feasts are born</span></p>

            <ScrollArea className="my-10">
                <div className="flex gap-8 overflow-scroll w-full">
                    {
                        categories.map((category) => (
                            <div className=" bg-amber-100 p-1 pr-4 lg:pr-6 rounded-4xl flex items-center gap-2 min-w-fit text-(--deep-charcoal)" key={category.name}>
                                <category.Icon className="w-9 h-9 lg:h-12 lg:w-12 p-2 bg-red-200 rounded-full"/>
                                <h3 className="text-lg lg:text-xl font-bold  ">{category.name}</h3>
                            </div>
                        ))
                    }
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <div className="bg-(--rose-white) p-2 rounded-2xl">
                <div className="flex justify-between md:text-xl text-lg mb-4 text-(--deep-charcoal)  ">
                    <h2>Most Popular</h2>
                    <button className="mr-5 bg-(--zesty-orange) py-1 px-3 rounded-2xl flex items-center gap-2 text-(--warm-cream) font-semibold ">View all <ArrowBigRightDashIcon /> </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  gap-y-10">
                    {
                        popular.map(recipe => (
                            <div className=" border-(--light-gray) shadow-xl max-w-[500px] border flex flex-col rounded-2xl text-(--deep-charcoal) bg-(--white) mx-auto " key={recipe.author + recipe.title}>
                            <div className="rounded-t-2xl overflow-hidden h-fit relative">
                                <RecipeImage width={500} height={500} image={recipe.image} />
                                <div className="absolute top-0 left-0 p-1 bg-linear-to-b from-(--wenge-brown)  
                                 w-full ">
                                    <button className="ml-1 mt-1" aria-label="Add to favourite">
                                        <TooltipProvider>
                                            <Tooltip>
                                                <TooltipTrigger className="flex items-center gap-2"> <Heart className=" rounded-full drop-shadow-lg
                                        w-9 h-9 text-(--rose-white) font-extrabold hover:fill-(--zesty-orange) "/></TooltipTrigger>
                                                <TooltipContent>
                                                <p className="text-lg p-2 rounded-xl bg-(--dark-charcoal) text-(--white) ">Add to favourites</p>
                                                </TooltipContent>
                                            </Tooltip>
                                        </TooltipProvider>
                                    </button>
                                </div>
                            </div>
                                <div className="p-3 flex flex-col justify-between ">
                                    <h2 className="text-2xl font-semibold font-[young-serif] ">{recipe.title}</h2>
                                    <div className="flex justify-between gap-5">
                                        <p>Cook Time: {recipe.cookTime} mins</p>
                                        <p>Author: {recipe.author}</p>
                                    </div>
                                </div>
                                <Button onClick={() => navigate(`/recipe/${recipe._id}`)} className="bg-(--zesty-orange) m-2 hover:bg-(--rich-brown)  md:text-xl text-lg ">View Recipe</Button>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className="bg-(--rose-white) p-2 rounded-2xl mt-15">
                <div className="flex justify-between md:text-xl text-lg mb-4 text-(--deep-charcoal) ">
                    <h2>New</h2>
                    <button className="mr-5 bg-(--zesty-orange) py-1 px-3 rounded-2xl flex items-center gap-2 text-(--warm-cream) font-semibold ">View all <ArrowBigRightDashIcon /> </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10">
                    {
                        newRecipes.map((recipe,index) => (
                            <div className={`h border-(--light-gray) max-w-[500px] shadow-xl border flex flex-col rounded-2xl text-(--deep-charcoal) bg-(--white) mx-auto ${index === (newRecipes.length - 1) && 'mb-10 md:mb-0'}`} key={recipe.author + recipe.title}>
                                <div className="rounded-t-2xl overflow-hidden h-fit relative">
                                    <RecipeImage width={500} height={500} image={recipe.image} />
                                    <div className="absolute top-0 left-0 p-1 bg-linear-to-b from-(--wenge-brown)  
                                     w-full ">
                                        <button className="ml-1 mt-1" aria-label="Add to favourite">
                                            <TooltipProvider>
                                                <Tooltip>
                                                    <TooltipTrigger className="flex items-center gap-2"> <Heart className=" rounded-full drop-shadow-lg
                                            w-9 h-9 text-(--rose-white) font-extrabold hover:fill-(--zesty-orange) "/></TooltipTrigger>
                                                    <TooltipContent>
                                                    <p className="text-lg p-2 rounded-xl bg-(--dark-charcoal) text-(--white) ">Add to favourites</p>
                                                    </TooltipContent>
                                                </Tooltip>
                                            </TooltipProvider>
                                        </button>
                                    </div>
                                </div>
                                <div className="p-3 flex flex-col justify-between ">
                                    <h2 className="text-2xl font-semibold font-[young-serif] ">{recipe.title}</h2>
                                    <div className="flex justify-between gap-5">
                                        <p>Cook Time: {recipe.cookTime} mins</p>
                                        <p>Author: {recipe.author}</p>
                                    </div>
                                </div>
                                <Button onClick={() => navigate(`/recipe/${recipe._id}`)} className="bg-(--zesty-orange) md:text-xl m-2 text-lg hover:bg-(--rich-brown) ">View Recipe</Button>
                            </div>
                        ))
                    }
                </div>
            </div>
            
        </section>
    )
}