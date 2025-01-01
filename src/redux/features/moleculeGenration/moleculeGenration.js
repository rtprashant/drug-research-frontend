import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    molecule : null,
    loading : false ,
    error : null ,
    dltLoading : false
}

const moleculeGenrationSlice = createSlice({
    name : 'moleculeGenration',
    initialState,
    reducers : {
        moleculeGenrationStart(state){
            state.loading = true ;
            state.error = null ;
            state.molecule = null;
        },
        moleculeGenrationSuccess(state , action){
            state.loading = false ;
            state.error = null ;
            state.molecule = action.payload;

        },
        moleculeGenrationFailure(state , action){
            state.loading = false ;
            state.error = action.payload ;
            state.molecule = null ;
        },
        dltMoleculeStart(state){
            state.dltLoading = true

        },
        dltMoleculeSuceess(state , action){
            state.molecule = null ;
            state.error= null;
            state.dltLoading = false
        },
        dltMoleculeFailure(state , action){
            state.dltLoading = false
            state.error = action.payload

        }

    }

})

export const {moleculeGenrationFailure , moleculeGenrationStart , moleculeGenrationSuccess , dltMoleculeStart , dltMoleculeSuceess , dltMoleculeFailure} = moleculeGenrationSlice.actions

export default moleculeGenrationSlice.reducer