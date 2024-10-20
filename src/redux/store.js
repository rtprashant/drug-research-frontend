import { combineReducers, configureStore } from '@reduxjs/toolkit'
import authReducer from './features/auth/userSlice'
import moleculeDetailsSlice from './features/research/moleculeDetailsResearchSlice'
import searchMoleculeSlice from './features/moleculeBank/searchMolecule'
import aiResearchSlice from './features/research/aiResearch'
import addMoleculeSlice from './features/moleculeBank/addMolecule'
import storage from 'redux-persist/lib/storage'
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist'
const persistConfig  = {
  key :'root' ,
  version: 1 ,
  storage
}
const rootReducer = combineReducers({
  auth: authReducer,
  moleculeDetails: moleculeDetailsSlice,
  aiResearch : aiResearchSlice,
  addMolecule : addMoleculeSlice,
  searchMolecule : searchMoleculeSlice

})

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
  reducer:persistedReducer,
  middleware:(getDefaultMiddleware)=>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH ,REGISTER ,PAUSE ,PERSIST ,PURGE ,REHYDRATE],
      }
    })
})


