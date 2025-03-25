import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { RootState } from "@/redux/store"
import { ChefHatIcon, CookieIcon, DrumstickIcon, EggFriedIcon, IceCreamBowlIcon, LucideProps, SandwichIcon, WineIcon } from "lucide-react"
import { useSelector } from "react-redux"

interface Category {
    name: string,
    Icon: React.ForwardRefExoticComponent<Omit<LucideProps, "ref"> & React.RefAttributes<SVGSVGElement>>
}

interface recipe {
    image: string,
    title: string,
    prepTime: string,
    author: string,
}

export default function Categories() {
    const user = useSelector((state:RootState) => state.user)

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

    const popular:recipe[] = [
        {
            image: '/assets/waakye.jpg',
            title: 'Waakye',
            prepTime: '30 mins',
            author: 'John Doe'
        },
        {
            image: '/assets/waakye.jpg',
            title: 'Jollof',
            prepTime: '30 mins',
            author: 'John Doe'
        },
        {
            image: '/assets/waakye.jpg',
            title: 'Banku',
            prepTime: '30 mins',
            author: 'John Doe'
        },
        {
            image: '/assets/waakye.jpg',
            title: 'Tuo zaafi',
            prepTime: '30 mins',
            author: 'John Doe'
        },
        {
            image: '/assets/waakye.jpg',
            title: 'Banku',
            prepTime: '30 mins',
            author: 'John Doe'
        },
        {
            image: '/assets/waakye.jpg',
            title: 'Tuo zaafi',
            prepTime: '30 mins',
            author: 'John Doe'
        }
    ]

    const newRecipes:recipe[] = [
        {
            image: '/assets/waakye.jpg',
            title: 'Waakye1',
            prepTime: '30 mins',
            author: 'John Doe'
        },
        {
            image: '/assets/waakye.jpg',
            title: 'Jollof1',
            prepTime: '30 mins',
            author: 'John Doe'
        },
        {
            image: '/assets/waakye.jpg',
            title: 'Banku1',
            prepTime: '30 mins',
            author: 'John Doe'
        },
        {
            image: '/assets/waakye.jpg',
            title: 'Tuo zaafi1',
            prepTime: '30 mins',
            author: 'John Doe'
        },
        {
            image: '/assets/waakye.jpg',
            title: 'Banku',
            prepTime: '30 mins',
            author: 'John Doe'
        },
        {
            image: '/assets/waakye.jpg',
            title: 'Tuo zaafi',
            prepTime: '30 mins',
            author: 'John Doe'
        }
    ]

    return (
        <section className={`py-5 h-[100vh] overflow-scroll ${!user.email ? 'w-[80vw]' : 'w-[57vw]'}`}>
            <h1 className="text-6xl font-extrabold text-amber-600 font-serif">Welcome to Zestify</h1>
            <p className="text-4xl mt-2 font-extrabold">Where recipes are shared and  <br /><span className="text-amber-500 font-serif"> feasts are born</span></p>

            <ScrollArea className="my-10">
                <div className="flex gap-8 overflow-scroll w-full">
                    {
                        categories.map((category) => (
                            <div className=" bg-amber-100 p-1 pr-6 rounded-4xl flex items-center gap-2 min-w-fit" key={category.name}>
                                <category.Icon className="h-12 w-12 p-2 bg-red-200 rounded-full"/>
                                <h3 className="text-xl font-bold">{category.name}</h3>
                            </div>
                        ))
                    }
                </div>
                <ScrollBar orientation="horizontal" />
            </ScrollArea>

            <div>
                <div className="flex justify-between text-xl mb-4">
                    <h2>Most Popular</h2>
                    <button className="mr-5">View all</button>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6  ">
                    {
                        popular.map(recipe => (
                            <div className="h-[600px max-w-[] bg-red-200 flex flex-col rounded-2xl" key={recipe.author + recipe.title}>
                                <img className=" aspect-square rounded-t-xl" src={recipe.image} alt="" />
                                <div className="p-3 flex flex-col justify-between h-1/2">
                                    <h2>{recipe.title}</h2>
                                    <div className="flex justify-between">
                                        <p>Prep Time: {recipe.prepTime}</p>
                                        <p>Author: {recipe.author}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>

            <div>
                <div className="flex justify-between text-xl mt-15 mb-4">
                    <h2>New</h2>
                    <button className="mr-5">View all</button>
                </div>
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-6 ">
                    {
                        newRecipes.map(recipe => (
                            <div className="h-[200px bg-red-200 flex flex-col rounded-2xl" key={recipe.author + recipe.title}>
                                <img className="aspect-square rounded-t-xl" src={recipe.image} alt="" />
                                <div className="p-3 flex flex-col justify-between h-1/2">
                                    <h2>{recipe.title}</h2>
                                    <div className="flex justify-between">
                                        <p>Prep Time: {recipe.prepTime}</p>
                                        <p>Author: {recipe.author}</p>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </div>
            </div>
            
        </section>
    )
}