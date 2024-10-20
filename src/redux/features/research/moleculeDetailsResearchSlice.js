import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    moleculeDetails : null,
    loading: false,
    error: null
}

const moleculeDetailsSlice = createSlice(
    {
        name: 'moleculeDetails',
        initialState,
        reducers: {
            getMoleculeDetailsRequest(state) {
                state.loading = true;
                state.error = null;
            },
            getMoleculeDetailsSuccess(state, action) {
                state.loading = false;
                state.moleculeDetails = action.payload
            },
            getMoleculeDetailsFailure(state , action){
                state.loading = false;
                state.error = action.payload
            }
    
    
        }
    }
)
export const {getMoleculeDetailsFailure , getMoleculeDetailsRequest ,getMoleculeDetailsSuccess}= moleculeDetailsSlice.actions
export default moleculeDetailsSlice.reducer