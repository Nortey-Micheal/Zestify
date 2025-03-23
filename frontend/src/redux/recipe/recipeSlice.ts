import { createSlice } from "@reduxjs/toolkit";

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
    image: File | null,
}

const initialState: Recipe[] = []

const recipeSlice = createSlice({
    name: 'recipes',
    initialState,
    reducers: {
           
    }
})

export default recipeSlice.reducer