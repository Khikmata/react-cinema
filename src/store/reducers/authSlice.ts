import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";



export enum Status {
	PENDING = 'pending',
	FULFILLED = 'fulfilled',
	REJECTED = 'rejected',
}


interface IData {
	userName: string;
	password: string;
	email: string;
}

interface AuthState {
	isAuth: boolean;
	data: IData[];
	status: Status;
}


const initialState: AuthState = {
	isAuth: false,
	data: [],
	status: Status.PENDING,
}

export const register = createAsyncThunk('/auth/register', async (props: IData) => {
	const { data } = await axios.get('http://localhost:4444/register');
	return data;
})
export const login = createAsyncThunk('/auth/login', async () => {
	const { data } = await axios.get('http://localhost:4444/login');
	return data;
})

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
			.addCase(register.pending, (state, action) => {
				console.log('loading');
			})
			.addCase(register.fulfilled, (state, action) => {
				state.data = action.payload;
				console.log('fulfilled');
			})
			.addCase(register.rejected, (state, action) => {
				console.log('rejected');
			})
	}
});

export const { setAuth } = auth.actions;

export default auth.reducer;
