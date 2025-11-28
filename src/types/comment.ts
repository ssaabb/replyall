export interface Comment {
    id: string;
    userId: string;
    user: {
        id: string;
        username: string;
        profileImage?: string;
    };
    contentUrl: string;
    content: string;
    positionTag?: string;
    positionType?: 'timestamp' | 'scroll';
    positionValue?: number;
    isSpoiler: boolean;
    isBlocked: boolean;
    blockReason?: string;
    parentId?: string;
    likesCount: number;
    dislikesCount: number;
    repliesCount: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCommentDto {
    contentUrl: string;
    content: string;
    positionTag?: string;
    positionType?: 'timestamp' | 'scroll';
    positionValue?: number;
    isSpoiler?: boolean;
    parentId?: string;
}

export interface UpdateCommentDto {
    content: string;
    isSpoiler?: boolean;
}

export interface CommentFilters {
    hideSpoilers: boolean;
    hideAds: boolean;
    hideInappropriate: boolean;
}

export type CommentSortType = 'time' | 'popular' | 'relevant';

export interface CommentsState {
    comments: Comment[];
    loading: boolean;
    error: string | null;
    currentUrl: string | null;
    currentPosition: number | null;
    filters: CommentFilters;
    sort: CommentSortType;
    hasMore: boolean;
    page: number;
}
