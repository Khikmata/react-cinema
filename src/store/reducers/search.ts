import { createSlice } from '@reduxjs/toolkit';
interface ISearchState {
	isSearchOpen: boolean;
	searchValue: string;
}


const initialState: ISearchState = {
	isSearchOpen: false,
	searchValue: '',
}


const search = createSlice({
	name: 'modalStatus',
	initialState,
	reducers: {
		setSearchOpen: (state, action) => {
			state.isSearchOpen = action.payload;
		},
		setSearchValue: (state, action) => {
			state.searchValue = action.payload;
		}
	}
});

export const { setSearchOpen, setSearchValue } = search.actions;

export default search.reducer;