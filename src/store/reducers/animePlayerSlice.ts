import { ISources } from './../../models/IAnime';
import { createSlice } from '@reduxjs/toolkit';


interface IPlayerState {
	sources: ISources[];
}


const initialState: IPlayerState = {
	sources: [],
}


const animePlayer = createSlice({
	name: 'modalStatus',
	initialState,
	reducers: {
		setPlayerSources: (state, action) => {
			state.sources = action.payload;
		}
	}
});

export const { setPlayerSources } = animePlayer.actions;

export default animePlayer.reducer;