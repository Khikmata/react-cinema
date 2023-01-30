import { createSlice } from '@reduxjs/toolkit';
interface IModalState {
	isOpen: boolean;

}


const initialState: IModalState = {
	isOpen: false,

}


const modal = createSlice({
	name: 'modalStatus',
	initialState,
	reducers: {
		setOpen: (state, action) => {
			state.isOpen = action.payload;
		}
	}
});

export const { setOpen } = modal.actions;

export default modal.reducer;