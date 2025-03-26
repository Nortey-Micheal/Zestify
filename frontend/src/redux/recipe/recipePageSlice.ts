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
}

const initialState: Recipe = {} as Recipe

const recipeSlice = createSlice({
    name: 'recipesPage',
    initialState,
    reducers: {
        setRecipePage: (state,action:PayloadAction<Recipe>) => {
            return action.payload
       },
       removeRecipePage: () => {
        return {} as Recipe
       }
    }
})

export default recipeSlice.reducer
export const { setRecipePage, removeRecipePage } = recipeSlice.actions