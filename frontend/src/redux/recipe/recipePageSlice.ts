import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipe } from "./recipeSlice";

const initialState: Recipe = {} as Recipe

const recipeSlice = createSlice({
    name: 'recipesPage',
    initialState,
    reducers: {
        setRecipePage: (state,action:PayloadAction<Recipe>) => {
            if (state) console.log('a')
            return action.payload
       },
       removeRecipePage: () => {
        return {} as Recipe
       }
    }
})

export default recipeSlice.reducer
export const { setRecipePage, removeRecipePage } = recipeSlice.actions