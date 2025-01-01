import { combineReducers, configureStore } from '@reduxjs/toolkit'
import signupReducer from './features/auth/signupSlice'
import loginReducer from './features/auth/loginSlice'
import currentUserReducer from './features/auth/userSlice'
import moleculeDetailsSlice from './features/research/moleculeDetailsResearchSlice'
import searchMoleculeSlice from './features/moleculeBank/searchMolecule'
import aiResearchSlice from './features/research/aiResearch'
import addMoleculeSlice from './features/moleculeBank/addMolecule'
import moleculeGenrationSlice from './features/moleculeGenration/moleculeGenration'
import storage from 'redux-persist/lib/storage'
import { FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE } from 'redux-persist'

const persistConfig  = {
  key :'root' ,
  version: 1 ,
  storage,
  blacklist: ['signup' ]
}
const rootReducer = combineReducers({
  signup: signupReducer,
  login : loginReducer,
  user : currentUserReducer,
  moleculeDetails: moleculeDetailsSlice,
  aiResearch : aiResearchSlice,
  addMolecule : addMoleculeSlice,
  searchMolecule : searchMoleculeSlice,
  moleculeGenration : moleculeGenrationSlice
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


