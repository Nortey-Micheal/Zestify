import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './user/userSlice'
import popularRecipesReducer from './recipe/popularRecipes'
import newRecipesReducer from './recipe/newRecipes'
import recipesReducer from './recipe/recipeSlice'
import recipePageReducer from './recipe/recipePageSlice'
import isAuthenticatedReducer from './user/isAuthenticated'
import searchRecipesReducer from './recipe/searchRecipe'
import categoriesRecipesReducer from './recipe/categories'

const rootReducer = combineReducers({
    user: userReducer,
    popularRecipes: popularRecipesReducer,
    newRecipes: newRecipesReducer,
    recipes: recipesReducer,
    recipePage: recipePageReducer,
    isAuthenticated: isAuthenticatedReducer,
    searchRecipes: searchRecipesReducer,
    categoriesRecipes: categoriesRecipesReducer,
})

export default rootReducer