import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Heart, LucideProps } from "lucide-react"

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
    const categories:Category[] = [
        {
            name: "All",
            Icon: Heart
        },
        {
            name: "Healthy",
            Icon: Heart
        },
        {
            name: "Festives",
            Icon: Heart
        },
        {
            name: "Budget friendly",
            Icon: Heart
        }
    
    ]

    const popular:recipe[] = [
        {
            image: '',
            title: 'Waakye',
            prepTime: '30 mins',
            author: 'John Doe'
        },
        {
            image: '',
            title: 'Jollof',
            prepTime: '30 mins',
            author: 'John Doe'
        },
        {
            image: '',
            title: 'Banku',
            prepTime: '30 mins',
            author: 'John Doe'
        },
        {
            image: '',
            title: 'Tuo zaafi',
            prepTime: '30 mins',
            author: 'John Doe'
        }
    ]

    const newRecipes:recipe[] = [
        {
            image: '',
            title: 'Waakye1',
            prepTime: '30 mins',
            author: 'John Doe'
        },
        {
            image: '',
            title: 'Jollof1',
            prepTime: '30 mins',
            author: 'John Doe'
        },
        {
            image: '',
            title: 'Banku1',
            prepTime: '30 mins',
            author: 'John Doe'
        },
        {
            image: '',
            title: 'Tuo zaafi1',
            prepTime: '30 mins',
            author: 'John Doe'
        }
    ]

    return (
        <section className="py-5 h-[100vh] overflow-scroll w-[53vw] ">
            <h1 className="text-6xl font-extrabold text-amber-600 font-serif">Welcome to Zestify</h1>
            <p className="text-4xl mt-2 font-extrabold">Where recipes are shared and  <br /><span className="text-amber-500 font-serif"> feasts are born</span></p>

            <ScrollArea className="my-10">
                <div className="flex gap-8 overflow-scroll w-full">
                    {
                        categories.map((category) => (
                            <div className=" bg-amber-100 p-1 pr-6 rounded-4xl flex items-center gap-2 min-w-fit" key={category.name}>
                                <category.Icon className="h-12 w-12 p-2 bg-red-500 rounded-full"/>
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
                <div className="grid grid-cols-2 gap-3 ">
                    {
                        popular.map(recipe => (
                            <div className="h-[200px] bg-red-400 flex flex-col rounded-2xl" key={recipe.author + recipe.title}>
                                <img className="h-1/2 rounded-t-3xl" src={recipe.image} alt="" />
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
                <div className="grid grid-cols-2 gap-3 ">
                    {
                        newRecipes.map(recipe => (
                            <div className="h-[200px] bg-red-400 flex flex-col rounded-2xl" key={recipe.author + recipe.title}>
                                <img className="h-1/2 rounded-t-3xl" src={recipe.image} alt="" />
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