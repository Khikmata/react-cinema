import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";



export enum Status {
	PENDING = 'pending',
	FULFILLED = 'fulfilled',
	REJECTED = 'rejected',
}


export interface IDataRegister {
	userName: string;
	password: string;
	email: string;
}

export interface IDataLogin {
	userName: string;
	password: string;
}

interface AuthState {
	isAuth: boolean;
	data: IDataRegister;
	status: Status;
}

const nullValue = { userName: '', password: "", email: "" };

const initialState: AuthState = {
	isAuth: false,
	data: nullValue,
	status: Status.PENDING,
}

export const registerUser = createAsyncThunk('/auth/register', async (props: IDataRegister) => {
	const { data } = await axios.post(`${process.env.MONGODB_URI || 'http://localhost:4444/'}auth/register`, props);
	return data;
})
export const loginUser = createAsyncThunk('/auth/login', async (props: IDataLogin) => {

	const { data } = await axios.post(`${process.env.MONGODB_URI || 'http://localhost:4444/'}auth/login`, props);
	return data;
})

const auth = createSlice({
	name: 'authStatus',
	initialState,
	reducers: {
		setAuth: (state, action) => {
			state.isAuth = action.payload;
			if (state.isAuth === false) {
				state.data = nullValue;
				state.status = Status.PENDING;
			}
		}
	},
	extraReducers: (builder) => {
		builder
			.addCase(registerUser.pending, (state,) => {
				state.status = Status.PENDING;
				state.data = nullValue;
			})
			.addCase(registerUser.fulfilled, (state, action) => {
				state.status = Status.FULFILLED;
				state.data = action.payload;
			})
			.addCase(registerUser.rejected, (state,) => {
				state.status = Status.REJECTED;
				state.data = nullValue;
			})


			.addCase(loginUser.pending, (state,) => {
				state.data = nullValue;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.status = Status.FULFILLED;
				state.data = action.payload;
			})
			.addCase(loginUser.rejected, (state,) => {
				state.data = nullValue;
				state.status = Status.REJECTED;
			})
	}
});

export const { setAuth } = auth.actions;

export default auth.reducer;
