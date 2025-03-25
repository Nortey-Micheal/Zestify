import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Recipe } from "./recipeSlice";

const initialState:Recipe[] = []

const newRecipes = createSlice({
    name: "newRecipes",
    initialState,
    reducers: {
        setNewRecipes: (state, action:PayloadAction<Recipe[]>) => {
            return action.payload
        }
    }
})

export const { setNewRecipes } = newRecipes.actions
export default newRecipes.reducer;