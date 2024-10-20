import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    user: null,
    loading: false,
    error: null
}
const userSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        registerStart : (state)=>{
            state.loading = true
            state.error = null
        },
        registerSuccess : (state,action)=>{
            state.loading = false
            state.user = action.payload
        },
        registerFailed :(state,action)=>{
            state.loading = false
            state.error = action.payload
        },
        logoutUser :(state)=>{
            state.user = null
        },
        loginStart : (state )=>{
            state.loading = true
            state.error= null
        },
        loginSuccess : (state,action)=>{
            state.loading = false
            state.user = action.payload
        },
        loginFailed : (state,action)=>{
            state.loading = false
            state.error = action.payload
        }
    }
})

export const { registerStart ,registerSuccess ,registerFailed ,loginFailed ,loginStart ,loginSuccess ,logoutUser} = userSlice.actions
export default userSlice.reducer