export interface Notification {
    id: string;
    userId: string;
    type: 'reply' | 'like' | 'mention';
    content: string;
    relatedCommentId?: string;
    relatedUserId?: string;
    isRead: boolean;
    createdAt: string;
}

export interface NotificationsState {
    notifications: Notification[];
    unreadCount: number;
    loading: boolean;
    error: string | null;
}
