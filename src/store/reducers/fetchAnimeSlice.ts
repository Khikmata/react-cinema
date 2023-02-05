
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


export const fetchAnimes = createAsyncThunk('anime/fetchAnimes', async () => {
	const { data } = await axios.get<IAnimeDetails>(`https://api.consumet.org/anime/gogoanime/top-airing/`)
})
export const fetchAnimeById = createAsyncThunk('anime/fetchAnimeById', async (id: string) => {
	const { data } = await axios.get<IAnimeDetails>(`https://api.consumet.org/anime/gogoanime/info/${id}`);
	return data;
})


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
	extraReducers: (builder) => {
		builder
			.addCase(fetchAnimeById.pending, (state) => {
				state.status = Status.PENDING;
			})
			.addCase(fetchAnimeById.fulfilled, (state, action) => {
				state.details = action.payload;
				state.status = Status.FULFILLED;
			})
			.addCase(fetchAnimeById.rejected, (state) => {
				state.status = Status.REJECTED;
			})
	}
});

export const { setItem, setDetails } = fetchAnimeSlice.actions;

export default fetchAnimeSlice.reducer;
