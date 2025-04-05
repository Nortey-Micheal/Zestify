import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Recipe } from '../recipe/recipeSlice'

interface User{
    name: string,
    email: string,
    profilePicture: string,
    favouriteRecipes: Recipe[],
    postedRecipes: Recipe[],
    isVerified: boolean,
    bio: string
}

const initialState: User | null = {} as User

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state,action:PayloadAction<User>) => {
            if (state) console.log('a')
            return action.payload
        },
        removeUser: (state) => {
            if (state) console.log('a')
            return {} as User
        },
        setFavoriteRecipes: (state,action:PayloadAction<Recipe[]>) => {
            return {...state,favouriteRecipes:action.payload}
        }
    }
})

export default userSlice.reducer

export const { setUser, removeUser, setFavoriteRecipes } = userSlice.actions