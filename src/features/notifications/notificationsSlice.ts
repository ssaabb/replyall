import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { Notification, NotificationsState } from '../../types/notification';

const initialState: NotificationsState = {
    notifications: [],
    unreadCount: 0,
    loading: false,
    error: null,
};

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers: {
        fetchNotificationsStart: state => {
            state.loading = true;
            state.error = null;
        },
        fetchNotificationsSuccess: (
            state,
            action: PayloadAction<Notification[]>
        ) => {
            state.loading = false;
            state.notifications = action.payload;
            state.unreadCount = action.payload.filter(n => !n.isRead).length;
        },
        fetchNotificationsFailure: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
        addNotification: (state, action: PayloadAction<Notification>) => {
            state.notifications.unshift(action.payload);
            if (!action.payload.isRead) {
                state.unreadCount += 1;
            }
        },
        markAsRead: (state, action: PayloadAction<string>) => {
            const notification = state.notifications.find(
                n => n.id === action.payload
            );
            if (notification && !notification.isRead) {
                notification.isRead = true;
                state.unreadCount -= 1;
            }
        },
        markAllAsRead: state => {
            state.notifications.forEach(n => {
                n.isRead = true;
            });
            state.unreadCount = 0;
        },
        deleteNotification: (state, action: PayloadAction<string>) => {
            const notification = state.notifications.find(
                n => n.id === action.payload
            );
            if (notification && !notification.isRead) {
                state.unreadCount -= 1;
            }
            state.notifications = state.notifications.filter(
                n => n.id !== action.payload
            );
        },
    },
});

export const {
    fetchNotificationsStart,
    fetchNotificationsSuccess,
    fetchNotificationsFailure,
    addNotification,
    markAsRead,
    markAllAsRead,
    deleteNotification,
} = notificationsSlice.actions;

export default notificationsSlice.reducer;
