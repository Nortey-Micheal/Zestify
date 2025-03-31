import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface Recipe {
    title : string,
    description: string,
    author: string,
    cookTime: number,
    category: string,
    ingredients: {
        id: string
        value: string
    }[],
    instructions: {
        id: string
        value: string
    }[],
    image: File | null | string,
    likes: number,
    _id: string,
    authorPic: string,
}

const initialState: Recipe[] = []

const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
        setRecipes: (state,action:PayloadAction<Recipe[]>) => {
            return action.payload
       },
       removeRecipes: () => {
        return []
       }
    }
})

export default recipeSlice.reducer
export const { setRecipes, removeRecipes } = recipeSlice.actions