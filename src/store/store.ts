import fetchAnimeSlice from './reducers/fetchAnimeSlice';
import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import auth from './reducers/auth';
import modal from './reducers/modal';

const rootReducer = combineReducers({
    fetchAnimeSlice,
    auth,
    modal,
})

export const store = configureStore({
    reducer: rootReducer,
})



export type RootState = ReturnType<typeof store.getState>;

