import { createSlice } from "@reduxjs/toolkit";

const initialState = {
   loading : false,
   error : null,
   moleculeData : [],
   molecule : null,
  
}

const addMoleculeSlice = createSlice({
    name : 'addMolecule',
    initialState,
    reducers : {
        addMoleculeStart(state){
            state.loading = true
            state.error = null
            state.success = false
        },
        addMoleculeSuccess(state , action){
            state.loading = false
            state.molecule = action.payload
            state.moleculeData = [...state.moleculeData , state.molecule]
           
        },
        addMoleculeFailure(state , action){
            state.loading = false
            state.error = action.payload,
            state.molecule = null
            state.success = false
        },
        moleculeAddToList(state){
            state.moleculeData = [...state.moleculeData , state.molecule]
            state.molecule = null

        }

    }
    
})

export const {addMoleculeFailure , addMoleculeStart , addMoleculeSuccess ,moleculeAddToList} = addMoleculeSlice.actions

export default addMoleculeSlice.reducer