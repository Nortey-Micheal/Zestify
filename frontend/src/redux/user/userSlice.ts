import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { Recipe } from '../recipe/recipeSlice'

interface User{
    name: string,
    email: string,
    profilePicture: string,
    favouriteRecipes: Recipe[],
    postedRecipes: Recipe[],
    isVerified: boolean,
}

const initialState: User | null = {} as User

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state,action:PayloadAction<User>) => {
            return action.payload
        },
        removeUser: (state) => {
            return {} as User
        }
    }
})

export default userSlice.reducer

export const { setUser, removeUser } = userSlice.actions