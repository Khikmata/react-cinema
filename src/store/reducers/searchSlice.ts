import { createSlice } from '@reduxjs/toolkit';
interface ISearchState {
	isSearchOpen: boolean;
	searchValue: string;
	searchInputValue: string;
}


const initialState: ISearchState = {
	isSearchOpen: false,
	searchInputValue: '',
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
		},
		setSearchInputValue: (state, action) => {
			state.searchValue = action.payload;
		}
	}
});

export const { setSearchOpen, setSearchValue, setSearchInputValue } = search.actions;

export default search.reducer;