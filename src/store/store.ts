import fetchAnimeSlice from './reducers/fetchAnimeSlice';
import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import auth from './reducers/authSlice';
import modal from './reducers/authModalSlice';
import search from './reducers/searchSlice';
import animePlayer from './reducers/animePlayerSlice';
import comment from './reducers/CommentSlice';


const rootReducer = combineReducers({
    fetchAnimeSlice,
    auth,
    modal,
    search,
    animePlayer,
    comment,
})

export const store = configureStore({
    reducer: rootReducer,
})



export type RootState = ReturnType<typeof store.getState>;

