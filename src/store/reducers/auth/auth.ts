import { createSlice, PayloadAction } from "@reduxjs/toolkit"


interface AuthState {
	isAuth: boolean;
}


const initialState: AuthState = {
	isAuth: false
}


const auth = createSlice({
	name: 'authStatus',
	initialState,
	reducers: {
		setAuth: (state, action) => {
			state.isAuth = !state.isAuth;
		}
	}
});

export const { setAuth } = auth.actions;

export default auth.reducer;
