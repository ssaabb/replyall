import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { User } from '../../types/user';

interface UserState {
    profile: User | null;
    blockedUsers: string[];
    loading: boolean;
    error: string | null;
}

const initialState: UserState = {
    profile: null,
    blockedUsers: [],
    loading: false,
    error: null,
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setProfile: (state, action: PayloadAction<User>) => {
            state.profile = action.payload;
        },
        updateProfile: (state, action: PayloadAction<Partial<User>>) => {
            if (state.profile) {
                state.profile = { ...state.profile, ...action.payload };
            }
        },
        blockUser: (state, action: PayloadAction<string>) => {
            if (!state.blockedUsers.includes(action.payload)) {
                state.blockedUsers.push(action.payload);
            }
        },
        unblockUser: (state, action: PayloadAction<string>) => {
            state.blockedUsers = state.blockedUsers.filter(
                id => id !== action.payload
            );
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const {
    setProfile,
    updateProfile,
    blockUser,
    unblockUser,
    setLoading,
    setError,
} = userSlice.actions;

export default userSlice.reducer;
