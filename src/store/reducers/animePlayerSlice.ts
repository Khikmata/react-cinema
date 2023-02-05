import { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { ISources, IAnimePlayer } from '../../models/IAnime';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';



export enum Status {
	PENDING = 'pending',
	FULFILLED = 'fulfilled',
	REJECTED = 'rejected',
}

interface IPlayerState {
	sources: ISources[];
	status: Status;
}

const initialState: IPlayerState = {
	sources: [],
	status: Status.PENDING,
}

interface IFetchProps {
	id: string,
	currentEpisode: number,
}

export const fetchAnimePlayer = createAsyncThunk('anime/fetchAnimePlayer', async (fetchProps: IFetchProps) => {

	const { id, currentEpisode } = fetchProps;
	const { data } = await axios.get<ISources[]>(`https://api.consumet.org/anime/gogoanime/servers/${id}-episode-${currentEpisode}`);
	const urls = data.map((item) => item.url)
	console.log(urls)
	return urls;
})


const animePlayer = createSlice({
	name: 'modalStatus',
	initialState,
	reducers: {
		setPlayerSources: (state, action) => {
			state.sources = action.payload;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchAnimePlayer.pending, (state) => {
				state.status = Status.PENDING;
			})
			.addCase(fetchAnimePlayer.fulfilled, (state, action: any) => {
				state.sources = action.payload
				state.status = Status.FULFILLED;
			})
			.addCase(fetchAnimePlayer.rejected, (state) => {
				state.sources = [];
				state.status = Status.REJECTED;
			})
	}
});

export const { setPlayerSources } = animePlayer.actions;

export default animePlayer.reducer;