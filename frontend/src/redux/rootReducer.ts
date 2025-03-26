import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './user/userSlice'
import popularRecipesReducer from './recipe/popularRecipes'
import newRecipesReducer from './recipe/newRecipes'
import recipesReducer from './recipe/recipeSlice'
import recipePageReducer from './recipe/recipePageSlice'

const rootReducer = combineReducers({
    user: userReducer,
    popularRecipes: popularRecipesReducer,
    newRecipes: newRecipesReducer,
    recipes: recipesReducer,
    recipePage: recipePageReducer
})

export default rootReducer