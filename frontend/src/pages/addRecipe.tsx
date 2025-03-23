import RecipeForm from "@/components/recipe-form";

export default function AddRecipe() {
    return (
        <main className="container mx-auto py-10 px-4">
            <h1 className="text-3xl font-bold mb-8 text-center">Create New Recipe</h1>
            <RecipeForm />
      </main>
    )
}