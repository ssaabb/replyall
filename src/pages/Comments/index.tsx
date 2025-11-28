import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import type { RootState } from '../../store';
import {
    setCurrentUrl,
    setFilters,
    setSort,
    addComment,
    likeComment,
    unlikeComment,
} from '../../features/comments/commentsSlice';
import type { Comment, CommentSortType } from '../../types/comment';
import CommentList from '../../components/comment/CommentList';
import CommentForm from '../../components/comment/CommentForm';
import CommentFilters from '../../components/comment/CommentFilters';
import './Comments.css';

function Comments() {
    const dispatch = useDispatch();
    const [searchParams] = useSearchParams();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const { comments, filters, sort, currentUrl, currentPosition } = useSelector(
        (state: RootState) => state.comments
    );

    const contentUrl = searchParams.get('url') || 'https://example.com/demo';

    useEffect(() => {
        if (contentUrl !== currentUrl) {
            dispatch(setCurrentUrl(contentUrl));
            loadMockComments();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [contentUrl, currentUrl, dispatch]);

    const loadMockComments = () => {
        const mockComments: Comment[] = [
            {
                id: '1',
                userId: 'user-1',
                user: {
                    id: 'user-1',
                    username: '영화광',
                    profileImage: '',
                },
                contentUrl: contentUrl,
                content: '이 장면 정말 감동적이에요! 😭',
                positionTag: '03:25',
                positionType: 'timestamp',
                positionValue: 205,
                isSpoiler: false,
                isBlocked: false,
                likesCount: 15,
                dislikesCount: 0,
                repliesCount: 2,
                createdAt: new Date(Date.now() - 3600000).toISOString(),
                updatedAt: new Date(Date.now() - 3600000).toISOString(),
            },
            {
                id: '2',
                userId: 'user-2',
                user: {
                    id: 'user-2',
                    username: '드라마덕후',
                    profileImage: '',
                },
                contentUrl: contentUrl,
                content: '스포일러 주의! 나중에 반전이 있어요',
                positionTag: '15:42',
                positionType: 'timestamp',
                positionValue: 942,
                isSpoiler: true,
                isBlocked: false,
                likesCount: 8,
                dislikesCount: 2,
                repliesCount: 0,
                createdAt: new Date(Date.now() - 7200000).toISOString(),
                updatedAt: new Date(Date.now() - 7200000).toISOString(),
            },
            {
                id: '3',
                userId: 'user-3',
                user: {
                    id: 'user-3',
                    username: '웹툰러버',
                    profileImage: '',
                },
                contentUrl: contentUrl,
                content: '작가님 그림체가 정말 예쁘네요 ✨',
                positionType: 'scroll',
                positionValue: 45.5,
                isSpoiler: false,
                isBlocked: false,
                likesCount: 23,
                dislikesCount: 0,
                repliesCount: 5,
                createdAt: new Date(Date.now() - 1800000).toISOString(),
                updatedAt: new Date(Date.now() - 1800000).toISOString(),
            },
        ];

        mockComments.forEach(comment => {
            dispatch(addComment(comment));
        });
    };

    const handleCommentSubmit = (content: string, isSpoiler: boolean) => {
        if (!isAuthenticated) {
            alert('로그인이 필요합니다.');
            return;
        }

        const formatPosition = (seconds: number): string => {
            const mins = Math.floor(seconds / 60);
            const secs = seconds % 60;
            return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
        };

        const newComment: Comment = {
            id: 'comment-' + Date.now(),
            userId: 'current-user',
            user: {
                id: 'current-user',
                username: '나',
                profileImage: '',
            },
            contentUrl: contentUrl,
            content: content,
            positionTag: currentPosition ? formatPosition(currentPosition) : undefined,
            positionType: 'timestamp',
            positionValue: currentPosition || 0,
            isSpoiler: isSpoiler,
            isBlocked: false,
            likesCount: 0,
            dislikesCount: 0,
            repliesCount: 0,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        };

        dispatch(addComment(newComment));
    };

    const handleLike = (commentId: string, isLiked: boolean) => {
        if (!isAuthenticated) {
            alert('로그인이 필요합니다.');
            return;
        }

        if (isLiked) {
            dispatch(unlikeComment(commentId));
        } else {
            dispatch(likeComment(commentId));
        }
    };

    const handleFilterChange = (filterType: string, value: boolean) => {
        dispatch(setFilters({ [filterType]: value }));
    };

    const handleSortChange = (newSort: CommentSortType) => {
        dispatch(setSort(newSort));
    };

    const filteredComments = comments.filter((comment: Comment) => {
        if (filters.hideSpoilers && comment.isSpoiler) return false;
        if (filters.hideInappropriate && comment.isBlocked) return false;
        return true;
    });

    const sortedComments = [...filteredComments].sort((a, b) => {
        switch (sort) {
            case 'time':
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            case 'popular':
                return b.likesCount - a.likesCount;
            case 'relevant':
                if (currentPosition && a.positionValue && b.positionValue) {
                    const distA = Math.abs(a.positionValue - currentPosition);
                    const distB = Math.abs(b.positionValue - currentPosition);
                    return distA - distB;
                }
                return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
            default:
                return 0;
        }
    });

    return (
        <div className="comments-page">
            <div className="container">
                <div className="comments-header">
                    <div className="header-info">
                        <h1>댓글</h1>
                        <p className="content-url">{contentUrl}</p>
                    </div>
                    <div className="header-stats">
                        <span className="stat">
                            💬 {comments.length}개의 댓글
                        </span>
                    </div>
                </div>

                <div className="comments-content">
                    <div className="comments-main">
                        <CommentForm
                            onSubmit={handleCommentSubmit}
                            isAuthenticated={isAuthenticated}
                        />

                        <CommentFilters
                            filters={filters}
                            sort={sort}
                            onFilterChange={handleFilterChange}
                            onSortChange={handleSortChange}
                        />

                        <CommentList
                            comments={sortedComments}
                            onLike={handleLike}
                            currentUserId="current-user"
                        />

                        {sortedComments.length === 0 && (
                            <div className="empty-state">
                                <p>아직 댓글이 없습니다.</p>
                                <p>첫 번째 댓글을 작성해보세요! 🎉</p>
                            </div>
                        )}
                    </div>

                    <div className="comments-sidebar">
                        <div className="sidebar-card">
                            <h3>💡 사용 팁</h3>
                            <ul>
                                <li>특정 시간이나 위치에 댓글을 남길 수 있어요</li>
                                <li>스포일러는 자동으로 숨겨집니다</li>
                                <li>좋아요를 눌러 공감을 표현하세요</li>
                                <li>대댓글로 토론에 참여하세요</li>
                            </ul>
                        </div>

                        <div className="sidebar-card">
                            <h3>🔥 인기 댓글</h3>
                            <p className="coming-soon">곧 제공될 예정입니다</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comments;
