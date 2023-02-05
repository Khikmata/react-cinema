import { Status } from './fetchAnimeSlice';
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import axios from "axios";


interface commentItemUser {
	userName: string;
	avatarUrl: string;
}

interface commentItem {
	_id: string;
	text: string;
	likesCount: number;
	user: commentItemUser;
}


interface commentState {
	comments: {
		items: commentItem[],
		status: Status,
	}
}


const initialState: commentState = {
	comments: {
		items: [],
		status: Status.PENDING,
	}
}

export const fetchCommentsData = createAsyncThunk('/comments/fetchAllComments', async () => {
	const { data } = await axios.get('http://localhost:4444/comments');
	return data;
})

const comment = createSlice({
	name: 'commentStatus',
	initialState,
	reducers: {
		getAllComments: (state, action) => {
			state.comments = action.payload;
		},

	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchCommentsData.pending, (state, action) => {
				state.comments.items = [];
				console.log('loading');
			})
			.addCase(fetchCommentsData.fulfilled, (state, action) => {
				state.comments.items = action.payload;
				console.log('fulfilled');
			})
			.addCase(fetchCommentsData.rejected, (state, action) => {
				state.comments.items = [];
				console.log('rejected');
			})
	}
});

export const { getAllComments } = comment.actions;

export default comment.reducer;
