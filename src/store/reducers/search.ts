import { createSlice } from '@reduxjs/toolkit';
interface ISearchState {
	isSearchOpen: boolean;
}


const initialState: ISearchState = {
	isSearchOpen: false,
}


const search = createSlice({
	name: 'modalStatus',
	initialState,
	reducers: {
		setSearchOpen: (state, action) => {
			state.isSearchOpen = action.payload;
		}
	}
});

export const { setSearchOpen } = search.actions;

export default search.reducer;