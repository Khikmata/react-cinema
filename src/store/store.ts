import fetchAnimeSlice from './reducers/fetchAnimeSlice';
import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import auth from './reducers/auth/auth';


const rootReducer = combineReducers({
    fetchAnimeSlice,
    auth
})

export const store = configureStore({
    reducer: rootReducer,
})



export type RootState = ReturnType<typeof store.getState>;

