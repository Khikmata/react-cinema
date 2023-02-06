import { createAsyncThunk } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
interface IModalState {
	isModalOpen: boolean;
}


const initialState: IModalState = {
	isModalOpen: false,

}



const modal = createSlice({
	name: 'modalStatus',
	initialState,
	reducers: {
		setModalOpen: (state, action) => {
			state.isModalOpen = action.payload;
		}
	}
});

export const { setModalOpen } = modal.actions;

export default modal.reducer;