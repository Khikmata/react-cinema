import fetchAnimeSlice from './reducers/fetchAnimeSlice';
import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import auth from './reducers/authSlice';
import modal from './reducers/modalSlice';
import search from './reducers/searchSlice';
import animePlayer from './reducers/animePlayerSlice';

const rootReducer = combineReducers({
    fetchAnimeSlice,
    auth,
    modal,
    search,
    animePlayer,
})

export const store = configureStore({
    reducer: rootReducer,
})



export type RootState = ReturnType<typeof store.getState>;

