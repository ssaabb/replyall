import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../features/auth/authSlice';
import './Register.css';

function Register() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
        setError('');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        // 입력 검증
        if (!formData.username || !formData.email || !formData.password || !formData.confirmPassword) {
            setError('모든 필드를 입력해주세요.');
            setLoading(false);
            return;
        }

        if (formData.username.length < 3) {
            setError('사용자 이름은 3자 이상이어야 합니다.');
            setLoading(false);
            return;
        }

        if (formData.password.length < 6) {
            setError('비밀번호는 6자 이상이어야 합니다.');
            setLoading(false);
            return;
        }

        if (formData.password !== formData.confirmPassword) {
            setError('비밀번호가 일치하지 않습니다.');
            setLoading(false);
            return;
        }

        // 임시 회원가입 로직 (백엔드 구현 전)
        setTimeout(() => {
            const mockUser = {
                id: 'user-' + Date.now(),
                email: formData.email,
                username: formData.username,
                profileImage: '',
                bio: '',
                isVerified: false,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            const mockToken = 'mock-jwt-token-' + Date.now();

            // 자동 로그인
            dispatch(loginSuccess({ user: mockUser, token: mockToken }));

            setLoading(false);
            navigate('/');
        }, 1000);
    };

    return (
        <div className="register-page">
            <div className="register-container">
                <div className="register-card">
                    <div className="register-header">
                        <h1>회원가입</h1>
                        <p>모두의 리뷰와 함께 시작하세요</p>
                    </div>

                    {error && (
                        <div className="error-message">
                            <span>⚠️</span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="register-form">
                        <div className="form-group">
                            <label htmlFor="username">사용자 이름</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={formData.username}
                                onChange={handleChange}
                                placeholder="3자 이상 입력"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">이메일</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="example@email.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">비밀번호</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="6자 이상 입력"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="confirmPassword">비밀번호 확인</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                name="confirmPassword"
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                placeholder="비밀번호 재입력"
                                required
                            />
                        </div>

                        <div className="terms">
                            <label className="checkbox-label">
                                <input type="checkbox" required />
                                <span>
                                    <Link to="/terms" className="link">이용약관</Link> 및{' '}
                                    <Link to="/privacy" className="link">개인정보처리방침</Link>에 동의합니다
                                </span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className="btn-submit"
                            disabled={loading}
                        >
                            {loading ? '가입 중...' : '회원가입'}
                        </button>
                    </form>

                    <div className="register-footer">
                        <p>
                            이미 계정이 있으신가요?{' '}
                            <Link to="/login" className="login-link">
                                로그인
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
