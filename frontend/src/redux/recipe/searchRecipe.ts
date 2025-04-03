import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipe } from "./recipeSlice";

const initialState:Recipe[] = []

const searchRecipes = createSlice({
    name: "searchRecipes",
    initialState,
    reducers: {
        setSearchRecipes: (state, action:PayloadAction<Recipe[]>) => {
            return action.payload
        },
        removeSearchRecipes: () => {
            return []
        }
    }
})

export const { setSearchRecipes, removeSearchRecipes } = searchRecipes.actions
export default searchRecipes.reducer;