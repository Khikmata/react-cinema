
import { IAnimeData, IAnimeDetails } from '../../models/IAnime';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from 'axios';


export enum Status {
	PENDING = 'pending',
	FULFILLED = 'fulfilled',
	REJECTED = 'rejected',
}

interface IFetchAnimeInitState {
	details: IAnimeDetails;
	items: IAnimeData[];
	status: Status;
}

const initialState: IFetchAnimeInitState = {
	details: { description: '', episodes: [], genres: [], id: '', image: '', title: '' },
	items: [],
	status: Status.PENDING,
}

export const fetchAnimeSlice = createSlice({
	name: 'animeFetchStatus',
	initialState,
	reducers: {
		setItem: (state, action: PayloadAction<IAnimeData[]>) => {
			state.items = action.payload;
		},
		setDetails: (state, action: PayloadAction<IAnimeDetails>) => {
			state.details = action.payload;
		},
	},

});

export const { setItem, setDetails } = fetchAnimeSlice.actions;

export default fetchAnimeSlice.reducer;
