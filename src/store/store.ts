import fetchAnimeSlice from './reducers/fetchAnimeSlice';
import { configureStore } from "@reduxjs/toolkit"
import { combineReducers } from "redux"
import auth from './reducers/auth';
import modal from './reducers/modal';
import search from './reducers/search';

const rootReducer = combineReducers({
    fetchAnimeSlice,
    auth,
    modal,
    search,
})

export const store = configureStore({
    reducer: rootReducer,
})



export type RootState = ReturnType<typeof store.getState>;

