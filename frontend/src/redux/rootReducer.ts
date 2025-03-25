import { combineReducers } from "@reduxjs/toolkit";
import userReducer from './user/userSlice'
import popularRecipesReducer from './recipe/popularRecipes'
import newRecipesReducer from './recipe/newRecipes'

const rootReducer = combineReducers({
    user: userReducer,
    popularRecipes: popularRecipesReducer,
    newRecipes: newRecipesReducer,
})

export default rootReducer