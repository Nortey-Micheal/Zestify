import RecipeForm from "@/components/recipe-form";
import { ArrowBigLeftDashIcon } from "lucide-react";
import { useNavigate } from "react-router";
import withAuth from "../user/withAuth";

function AddRecipe() {
    const navigate = useNavigate()
    return (
        <main className="container mx-auto py-10 px-4 bg-(--eggshell) ">
                <button onClick={() => navigate('/')} className="flex items-center fixed top-3 left-3 bg-(--zesty-orange) rounded-xl px-3 py-1 text-(--rose-white) "><ArrowBigLeftDashIcon /> <span className="hidden md:block">Back</span></button>

            <h1 className="text-3xl font-bold mb-8 text-center font-[young-serif] ">Create New Recipe</h1>
            <RecipeForm />
      </main>
    )
}

export default withAuth(AddRecipe)