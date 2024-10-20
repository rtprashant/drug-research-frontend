import { createSlice } from "@reduxjs/toolkit";
const initialState = {
    searchloading : false,
    searcherror :null,
    element : null ,
    search : false ,
}

const searchMoleculeSlice = createSlice({
    name: "searchMolecule",
    initialState,
    reducers:{
        searchMoleculeStart(state) {
            state.searchloading = true;
            state.searcherror = null;
            state.element = null ;
            state.search = true ;
        },
        searchMoleculeSuccess(state, action) {
            state.searchloading = false;
            state.element = action.payload;
            state.searcherror = null ;
            state.search = true;
        },
        searchMoleculeFailure(state , action){
            state.searchloading = false ;
            state.searcherror = action.payload ;
            state.element = null ;
            state.search = false ;
        },
        searchMoleculeStop(state){
            state.searchloading = false ;
            state.searcherror = null ;
            state.element = null ;
            state.search = false
        }

    }

})

export const { searchMoleculeStart , searchMoleculeSuccess , searchMoleculeFailure ,searchMoleculeStop } = searchMoleculeSlice.actions
export default searchMoleculeSlice.reducer