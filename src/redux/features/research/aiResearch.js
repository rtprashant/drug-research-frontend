import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    prompt: null,
    promptLoading: false,
    promptError: null,
    response: null,
    responseLoading: false,
    responseError: null,

}

const aiResearchSlice = createSlice({
    name: "aiResearch",
    initialState,
    reducers: {
        getPromptSendRequest(state) {
            state.promptLoading = true
            state.promptError = null
        },
        getPromptSuccess(state, action) {
            state.promptLoading = false
            state.prompt = action.payload
            state.promptError = null
        },
        getPromptFailure(state, action) {
            state.promptLoading = false
            state.promptError = action.payload
        },
        getResponseRequest(state){
            state.responseLoading = true
            state.responseError = null

        },
        getResponseSuccess(state, action) {
            state.responseLoading = false
            state.response = action.payload
        },
        getResponseFailure(state, action) {
            state.responseLoading = false
            state.responseError = action.payload
        },
        setPromptAndResponse(state,action){
            state.prompt = null,
            state.response = null
        }
    }

})
export const{getPromptFailure , getPromptSendRequest , getPromptSuccess , getResponseFailure , getResponseRequest , getResponseSuccess ,setPromptAndResponse} = aiResearchSlice.actions
export default aiResearchSlice.reducer