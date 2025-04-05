import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipe } from "./recipeSlice";

const initialState:Recipe[] = []

const popularRecipes = createSlice({
    name: "popularRecipes",
    initialState,
    reducers: {
        setPopularRecipes: (state, action:PayloadAction<Recipe[]>) => {
            if (state) console.log('a')
            return action.payload
        }
    }
})

export const { setPopularRecipes } = popularRecipes.actions
export default popularRecipes.reducer;