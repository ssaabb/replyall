import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import './Header.css';

function Header() {
    const { isAuthenticated, user } = useSelector(
        (state: RootState) => state.auth
    );
    const { unreadCount } = useSelector(
        (state: RootState) => state.notifications
    );

    return (
        <header className="header">
            <div className="container">
                <div className="header-content">
                    <Link to="/" className="logo">
                        <h1>모두의 리뷰</h1>
                    </Link>

                    <nav className="nav">
                        <Link to="/comments" className="nav-link">
                            댓글
                        </Link>
                        {isAuthenticated ? (
                            <>
                                <Link to="/profile" className="nav-link">
                                    프로필
                                </Link>
                                <Link to="/settings" className="nav-link">
                                    설정
                                </Link>
                                <div className="notification-badge">
                                    <span className="icon">🔔</span>
                                    {unreadCount > 0 && (
                                        <span className="badge">{unreadCount}</span>
                                    )}
                                </div>
                                <div className="user-info">
                                    {user?.profileImage ? (
                                        <img
                                            src={user.profileImage}
                                            alt={user.username}
                                            className="avatar"
                                        />
                                    ) : (
                                        <div className="avatar-placeholder">
                                            {user?.username.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                    <span className="username">{user?.username}</span>
                                </div>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="nav-link">
                                    로그인
                                </Link>
                                <Link to="/register" className="btn-primary">
                                    회원가입
                                </Link>
                            </>
                        )}
                    </nav>
                </div>
            </div>
        </header>
    );
}

export default Header;
