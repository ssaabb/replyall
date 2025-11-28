import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import commentsReducer from '../features/comments/commentsSlice';
import userReducer from '../features/user/userSlice';
import notificationsReducer from '../features/notifications/notificationsSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        comments: commentsReducer,
        user: userReducer,
        notifications: notificationsReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
