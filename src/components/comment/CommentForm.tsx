import { useState } from 'react';
import './CommentForm.css';

interface CommentFormProps {
    onSubmit: (content: string, isSpoiler: boolean) => void;
    isAuthenticated: boolean;
    parentId?: string;
}

function CommentForm({ onSubmit, isAuthenticated, parentId }: CommentFormProps) {
    const [content, setContent] = useState('');
    const [isSpoiler, setIsSpoiler] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!content.trim()) {
            return;
        }

        onSubmit(content, isSpoiler);
        setContent('');
        setIsSpoiler(false);
    };

    if (!isAuthenticated) {
        return (
            <div className="comment-form-placeholder">
                <p>댓글을 작성하려면 <a href="/login">로그인</a>이 필요합니다.</p>
            </div>
        );
    }

    return (
        <form className="comment-form" onSubmit={handleSubmit}>
            <textarea
                className="comment-input"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder={parentId ? "답글을 입력하세요..." : "댓글을 입력하세요..."}
                rows={4}
                maxLength={1000}
            />

            <div className="comment-form-footer">
                <div className="form-options">
                    <label className="checkbox-label">
                        <input
                            type="checkbox"
                            checked={isSpoiler}
                            onChange={(e) => setIsSpoiler(e.target.checked)}
                        />
                        <span>🔒 스포일러 포함</span>
                    </label>
                    <span className="char-count">
                        {content.length} / 1000
                    </span>
                </div>

                <button
                    type="submit"
                    className="btn-submit"
                    disabled={!content.trim()}
                >
                    {parentId ? '답글 작성' : '댓글 작성'}
                </button>
            </div>
        </form>
    );
}

export default CommentForm;
