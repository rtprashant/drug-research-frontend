import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    loggedInUser: null,
    loggedInLoading: false,
    loggedInError: null
}
const loginSlice = createSlice({
    name: 'login',
    initialState,
    reducers: {
        loginStart : (state )=>{
            state.loggedInLoading = true
            state.loggedInError= null
        },
        loginSuccess : (state,action)=>{
            state.loggedInLoading = false
            state.loggedInUser = action.payload
        },
        loginFailed : (state,action)=>{
            state.loggedInLoading = false
            state.loggedInError = action.payload
        },
        logoutUser :(state)=>{
            state.loggedInUser = null
        },
    }
})

export const { loginFailed ,loginStart ,loginSuccess , logoutUser  } = loginSlice.actions
export default loginSlice.reducer