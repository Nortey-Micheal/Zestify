import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import useGetNewRecipes from "@/hooks/recipes/useGetNewRecipes"
import { RootState } from "@/redux/store"
import { ArrowBigRightDashIcon, ChefHatIcon, CookieIcon, DrumstickIcon, EggFriedIcon, IceCreamBowlIcon, LucideProps, SandwichIcon, WineIcon } from "lucide-react"
import { useEffect } from "react"
import { useSelector } from "react-redux"
import useGetPopularRecipes from "@/hooks/recipes/useGetPopularRecipes"
import { Link } from "react-router"
import RecipeCard from "./recipeCard"

interface Category {
    name: string,
    Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
    link: string
}

export default function Categories() {
    const user = useSelector((state:RootState) => state.user)
    const newRecipes = useSelector((state:RootState) => state.newRecipes)
    const popular = useSelector((state:RootState) => state.popularRecipes)
    const { getNewRecipes } = useGetNewRecipes()
    const { getPopularRecipes } = useGetPopularRecipes()

    const categories:Category[] = [
        {
            name: "All",
            Icon: ChefHatIcon,
            link: ''
        },
        {
            name: "Breakfast",
            Icon: EggFriedIcon,
            link: 'breakfast'
        },
        {
            name: "Lunch",
            Icon: SandwichIcon,
            link: 'lunch'
        },
        {
            name: "Dinner",
            Icon: DrumstickIcon,
            link: 'dinner'
        },
        {
            name: "Dessert",
            Icon: IceCreamBowlIcon,
            link: 'dessert'
        },
        {
            name: "Snacks",
            Icon: CookieIcon,
            link: 'snacks'
        },
        {
            name: "Beverages",
            Icon: WineIcon,
            link: 'beverages'
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
        <section className={`px-3 py-5 lg:h-[100vh] w-[95vw] mx-auto overflow-scroll ${!user.email ? 'lg:w-[80vw]' : 'lg:w-[57vw]'}`}>
            <h1 className="text-4xl lg:text-6xl font-extrabold text-(--zesty-orange) font-[young-serif] ">Welcome to Zestify</h1>
            <p className="text-3xl lg:text-4xl mt-2 font-extrabold text-(--deep-charcoal) ">Where recipes are shared and  <br /><span className="text-(--zesty-orange) font-[young-serif] "> feasts are born</span></p>

            <ScrollArea className="my-10">
                <div className="flex gap-8 overflow-scroll w-full">
                    {
                        categories.map((category) => (
                            <Link to={`/categories/${category.link}`} className=" bg-amber-100 p-1 pr-4 lg:pr-6 rounded-4xl flex items-center gap-2 min-w-fit text-(--deep-charcoal)" key={category.name}>
                                <category.Icon className="w-10 h-10 lg:h-12 lg:w-12 p-1 bg-red-200 rounded-full"/>
                                <h3 className="text-lg lg:text-xl font-bold  ">{category.name}</h3>
                            </Link>
                        ))
                    }
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <div className="bg-(--rose-white) p-2 rounded-2xl">
                <div className="flex justify-between md:text-xl text-lg mb-4 text-(--deep-charcoal)  ">
                    <h2>Most Popular</h2>
                    <Link to={'/recipes/popular'} className="mr-5 bg-(--zesty-orange) py-1 px-3 rounded-2xl flex items-center gap-2 text-(--warm-cream) font-semibold ">View all <ArrowBigRightDashIcon /> </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6  gap-y-10">
                    {
                        popular.map(recipe => (
                            <RecipeCard key={recipe.author + recipe.title + 'popular'} recipe={recipe}/>
                        ))
                    }
                </div>
            </div>

            <div className="bg-(--rose-white) p-2 rounded-2xl mt-15">
                <div className="flex justify-between md:text-xl text-lg mb-4 text-(--deep-charcoal) ">
                    <h2>New</h2>
                    <Link to={'/recipes/new'} className="mr-5 bg-(--zesty-orange) py-1 px-3 rounded-2xl flex items-center gap-2 text-(--warm-cream) font-semibold ">View all <ArrowBigRightDashIcon /> </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 gap-y-10">
                    {
                        newRecipes.map((recipe) => (
                            <RecipeCard key={recipe.author + recipe.title + 'new'} recipe={recipe}/>
                        ))
                    }
                </div>
            </div>
            
        </section>
    )
}