import { createSlice } from "@reduxjs/toolkit";

const initialState:boolean = false

const isAuthenticatedSlice = createSlice({
    name: 'isAuthenticated',
    initialState,
    reducers: {
        setAuthentication: () => {
            return true
        },
        removeAuthentication: () => {
            return false
        }
    }
})

export const { setAuthentication, removeAuthentication } = isAuthenticatedSlice.actions

export default isAuthenticatedSlice.reducer