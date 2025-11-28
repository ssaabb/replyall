import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../../features/auth/authSlice';
import './Login.css';

function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [formData, setFormData] = useState({
        email: '',
        password: '',
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
        if (!formData.email || !formData.password) {
            setError('이메일과 비밀번호를 입력해주세요.');
            setLoading(false);
            return;
        }

        // 임시 로그인 로직 (백엔드 구현 전)
        // 실제로는 API 호출을 해야 합니다
        setTimeout(() => {
            // 데모용 사용자 데이터
            const mockUser = {
                id: 'user-' + Date.now(),
                email: formData.email,
                username: formData.email.split('@')[0],
                profileImage: '',
                bio: '',
                isVerified: true,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
            };

            const mockToken = 'mock-jwt-token-' + Date.now();

            // Redux 스토어에 저장
            dispatch(loginSuccess({ user: mockUser, token: mockToken }));

            setLoading(false);
            navigate('/');
        }, 1000);
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-card">
                    <div className="login-header">
                        <h1>로그인</h1>
                        <p>모두의 리뷰에 오신 것을 환영합니다</p>
                    </div>

                    {error && (
                        <div className="error-message">
                            <span>⚠️</span>
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="login-form">
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
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <div className="form-options">
                            <label className="checkbox-label">
                                <input type="checkbox" />
                                <span>로그인 상태 유지</span>
                            </label>
                            <Link to="/forgot-password" className="forgot-link">
                                비밀번호 찾기
                            </Link>
                        </div>

                        <button
                            type="submit"
                            className="btn-submit"
                            disabled={loading}
                        >
                            {loading ? '로그인 중...' : '로그인'}
                        </button>
                    </form>

                    <div className="login-footer">
                        <p>
                            계정이 없으신가요?{' '}
                            <Link to="/register" className="register-link">
                                회원가입
                            </Link>
                        </p>
                    </div>

                    <div className="divider">
                        <span>또는</span>
                    </div>

                    <div className="social-login">
                        <button className="btn-social btn-google">
                            <span>🔍</span>
                            Google로 로그인
                        </button>
                        <button className="btn-social btn-github">
                            <span>💻</span>
                            GitHub로 로그인
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
