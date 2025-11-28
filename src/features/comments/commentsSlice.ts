import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type {
    Comment,
    CommentsState,
    CommentFilters,
    CommentSortType,
} from '../../types/comment';

const initialState: CommentsState = {
    comments: [],
    loading: false,
    error: null,
    currentUrl: null,
    currentPosition: null,
    filters: {
        hideSpoilers: true,
        hideAds: true,
        hideInappropriate: true,
    },
    sort: 'relevant',
    hasMore: true,
    page: 1,
};

const commentsSlice = createSlice({
    name: 'comments',
    initialState,
    reducers: {
        setCurrentUrl: (state, action: PayloadAction<string>) => {
            state.currentUrl = action.payload;
            state.comments = [];
            state.page = 1;
            state.hasMore = true;
        },
        setCurrentPosition: (state, action: PayloadAction<number>) => {
            state.currentPosition = action.payload;
        },
        setFilters: (state, action: PayloadAction<Partial<CommentFilters>>) => {
            state.filters = { ...state.filters, ...action.payload };
        },
        setSort: (state, action: PayloadAction<CommentSortType>) => {
            state.sort = action.payload;
        },
        fetchCommentsStart: state => {
            state.loading = true;
            state.error = null;
        },
        fetchCommentsSuccess: (state, action: PayloadAction<Comment[]>) => {
            state.loading = false;
            state.comments = action.payload;
        },
        fetchMoreCommentsSuccess: (state, action: PayloadAction<Comment[]>) => {
            state.loading = false;
            state.comments = [...state.comments, ...action.payload];
            state.page += 1;
            state.hasMore = action.payload.length > 0;
        },
        fetchCommentsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        addComment: (state, action: PayloadAction<Comment>) => {
            state.comments.unshift(action.payload);
        },
        updateComment: (state, action: PayloadAction<Comment>) => {
            const index = state.comments.findIndex(c => c.id === action.payload.id);
            if (index !== -1) {
                state.comments[index] = action.payload;
            }
        },
        deleteComment: (state, action: PayloadAction<string>) => {
            state.comments = state.comments.filter(c => c.id !== action.payload);
        },
        likeComment: (state, action: PayloadAction<string>) => {
            const comment = state.comments.find(c => c.id === action.payload);
            if (comment) {
                comment.likesCount += 1;
            }
        },
        unlikeComment: (state, action: PayloadAction<string>) => {
            const comment = state.comments.find(c => c.id === action.payload);
            if (comment) {
                comment.likesCount -= 1;
            }
        },
    },
});

export const {
    setCurrentUrl,
    setCurrentPosition,
    setFilters,
    setSort,
    fetchCommentsStart,
    fetchCommentsSuccess,
    fetchMoreCommentsSuccess,
    fetchCommentsFailure,
    addComment,
    updateComment,
    deleteComment,
    likeComment,
    unlikeComment,
} = commentsSlice.actions;

export default commentsSlice.reducer;
