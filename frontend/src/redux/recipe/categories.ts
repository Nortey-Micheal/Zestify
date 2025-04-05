import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipe } from "./recipeSlice";

const initialState:Recipe[] = []

const categoriesRecipes = createSlice({
    name: "categoriesRecipes",
    initialState,
    reducers: {
        setCategoriesRecipes: (state, action:PayloadAction<Recipe[]>) => {
            if (state) console.log('a')
            return action.payload
        }
    }
})

export const { setCategoriesRecipes } = categoriesRecipes.actions
export default categoriesRecipes.reducer;