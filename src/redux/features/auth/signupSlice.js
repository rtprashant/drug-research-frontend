import {createSlice} from "@reduxjs/toolkit"
const initialState = {
    signupUser: null,
    signupLoading: false,
    singupError: null
}
const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        registerStart : (state)=>{
            state.signupLoading = true
            state.singupError = null
        },
        registerSuccess : (state,action)=>{
            state.signupLoading = false
            state.signupUser = action.payload
        },
        registerFailed :(state,action)=>{
            state.signupLoading = false
            state.singupError = action.payload
        },
        afterRegisterSuceess :(state)=>{
            state.signupLoading = false 
            state.signupUser = null
            state.singupError = null
        },
        
    }
})

export const { registerStart ,registerSuccess ,registerFailed ,afterRegisterSuceess } = signupSlice.actions
export default signupSlice.reducer