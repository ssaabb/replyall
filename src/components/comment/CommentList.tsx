import type { Comment } from '../../types/comment';
import CommentItem from './CommentItem';
import './CommentList.css';

interface CommentListProps {
    comments: Comment[];
    onLike: (commentId: string, isLiked: boolean) => void;
    currentUserId: string;
}

function CommentList({ comments, onLike, currentUserId }: CommentListProps) {
    return (
        <div className="comment-list">
            {comments.map(comment => (
                <CommentItem
                    key={comment.id}
                    comment={comment}
                    onLike={onLike}
                    currentUserId={currentUserId}
                />
            ))}
        </div>
    );
}

export default CommentList;
