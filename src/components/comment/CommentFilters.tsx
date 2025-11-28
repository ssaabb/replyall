import type { CommentFilters as Filters, CommentSortType } from '../../types/comment';
import './CommentFilters.css';

interface CommentFiltersProps {
    filters: Filters;
    sort: CommentSortType;
    onFilterChange: (filterType: string, value: boolean) => void;
    onSortChange: (sort: CommentSortType) => void;
}

function CommentFilters({
    filters,
    sort,
    onFilterChange,
    onSortChange,
}: CommentFiltersProps) {
    return (
        <div className="comment-filters">
            <div className="filters-section">
                <h3>필터</h3>
                <div className="filter-options">
                    <label className="filter-checkbox">
                        <input
                            type="checkbox"
                            checked={filters.hideSpoilers}
                            onChange={(e) => onFilterChange('hideSpoilers', e.target.checked)}
                        />
                        <span>🔒 스포일러 숨기기</span>
                    </label>

                    <label className="filter-checkbox">
                        <input
                            type="checkbox"
                            checked={filters.hideAds}
                            onChange={(e) => onFilterChange('hideAds', e.target.checked)}
                        />
                        <span>🚫 광고 숨기기</span>
                    </label>

                    <label className="filter-checkbox">
                        <input
                            type="checkbox"
                            checked={filters.hideInappropriate}
                            onChange={(e) => onFilterChange('hideInappropriate', e.target.checked)}
                        />
                        <span>⚠️ 불건전 댓글 숨기기</span>
                    </label>
                </div>
            </div>

            <div className="sort-section">
                <h3>정렬</h3>
                <div className="sort-options">
                    <button
                        className={`sort-btn ${sort === 'relevant' ? 'active' : ''}`}
                        onClick={() => onSortChange('relevant')}
                    >
                        🎯 관련도순
                    </button>
                    <button
                        className={`sort-btn ${sort === 'time' ? 'active' : ''}`}
                        onClick={() => onSortChange('time')}
                    >
                        🕒 최신순
                    </button>
                    <button
                        className={`sort-btn ${sort === 'popular' ? 'active' : ''}`}
                        onClick={() => onSortChange('popular')}
                    >
                        🔥 인기순
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CommentFilters;
