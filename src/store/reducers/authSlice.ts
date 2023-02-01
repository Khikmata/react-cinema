import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";

export const fetchUserData = createAsyncThunk('/auth/register', async (params) => {
	const { data } = await axios.post('/auth/login', params);
	return data;
})

export enum Status {
	PENDING = 'pending',
	FULFILLED = 'fulfilled',
	REJECTED = 'rejected',
}

interface AuthState {
	isAuth: boolean;
	data: any;
	status: Status;
}


const initialState: AuthState = {
	isAuth: false,
	data: null,
	status: Status.PENDING,
}


const auth = createSlice({
	name: 'authStatus',
	initialState,
	reducers: {
		setAuth: (state, action) => {
			state.isAuth = !state.isAuth;
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(Status.PENDING, (state, action) => {
				console.log('loading');
			})
			.addCase(Status.FULFILLED, (state, action) => {
				console.log('fulfilled');
			})
			.addCase(Status.REJECTED, (state, action) => {
				console.log('rejected');
			})
	}
});

export const { setAuth } = auth.actions;

export default auth.reducer;
