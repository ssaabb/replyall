import { useState } from 'react';
import type { Comment } from '../../types/comment';
import './CommentItem.css';

interface CommentItemProps {
    comment: Comment;
    onLike: (commentId: string, isLiked: boolean) => void;
    currentUserId: string;
}

function CommentItem({ comment, onLike, currentUserId }: CommentItemProps) {
    const [isLiked, setIsLiked] = useState(false);
    const [showSpoiler, setShowSpoiler] = useState(false);
    const [showReplyForm, setShowReplyForm] = useState(false);

    const handleLike = () => {
        setIsLiked(!isLiked);
        onLike(comment.id, isLiked);
    };

    const formatTimeAgo = (dateString: string): string => {
        const date = new Date(dateString);
        const now = new Date();
        const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (seconds < 60) return '방금 전';
        if (seconds < 3600) return `${Math.floor(seconds / 60)}분 전`;
        if (seconds < 86400) return `${Math.floor(seconds / 3600)}시간 전`;
        if (seconds < 604800) return `${Math.floor(seconds / 86400)}일 전`;
        return date.toLocaleDateString('ko-KR');
    };

    const isOwnComment = comment.userId === currentUserId;

    return (
        <div className="comment-item">
            <div className="comment-header">
                <div className="user-info">
                    {comment.user.profileImage ? (
                        <img
                            src={comment.user.profileImage}
                            alt={comment.user.username}
                            className="avatar"
                        />
                    ) : (
                        <div className="avatar-placeholder">
                            {comment.user.username.charAt(0).toUpperCase()}
                        </div>
                    )}
                    <div className="user-details">
                        <span className="username">{comment.user.username}</span>
                        <span className="timestamp">{formatTimeAgo(comment.createdAt)}</span>
                    </div>
                </div>

                {comment.positionTag && (
                    <div className="position-tag">
                        <span className="tag-icon">
                            {comment.positionType === 'timestamp' ? '⏱️' : '📍'}
                        </span>
                        <span>{comment.positionTag}</span>
                    </div>
                )}
            </div>

            <div className="comment-body">
                {comment.isSpoiler && !showSpoiler ? (
                    <div className="spoiler-warning">
                        <p>🔒 스포일러가 포함된 댓글입니다</p>
                        <button
                            className="btn-show-spoiler"
                            onClick={() => setShowSpoiler(true)}
                        >
                            내용 보기
                        </button>
                    </div>
                ) : (
                    <p className="comment-content">{comment.content}</p>
                )}
            </div>

            <div className="comment-footer">
                <div className="comment-actions">
                    <button
                        className={`btn-action ${isLiked ? 'active' : ''}`}
                        onClick={handleLike}
                    >
                        <span>{isLiked ? '❤️' : '🤍'}</span>
                        <span>{comment.likesCount + (isLiked ? 1 : 0)}</span>
                    </button>

                    <button
                        className="btn-action"
                        onClick={() => setShowReplyForm(!showReplyForm)}
                    >
                        <span>💬</span>
                        <span>답글 {comment.repliesCount}</span>
                    </button>

                    {isOwnComment && (
                        <>
                            <button className="btn-action">
                                <span>✏️</span>
                                <span>수정</span>
                            </button>
                            <button className="btn-action danger">
                                <span>🗑️</span>
                                <span>삭제</span>
                            </button>
                        </>
                    )}

                    {!isOwnComment && (
                        <button className="btn-action">
                            <span>🚨</span>
                            <span>신고</span>
                        </button>
                    )}
                </div>
            </div>

            {showReplyForm && (
                <div className="reply-form-container">
                    <p className="reply-placeholder">답글 기능은 곧 구현될 예정입니다</p>
                </div>
            )}
        </div>
    );
}

export default CommentItem;
