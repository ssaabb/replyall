import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import type { RootState } from '../../store';
import './Home.css';

function Home() {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state: RootState) => state.auth);
    const [url, setUrl] = useState('');

    const handleGetStarted = () => {
        if (isAuthenticated) {
            navigate('/comments');
        } else {
            navigate('/register');
        }
    };

    const handleLearnMore = () => {
        navigate('/comments?url=https://example.com/demo');
    };

    const handleUrlSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (url.trim()) {
            navigate(`/comments?url=${encodeURIComponent(url)}`);
        }
    };

    return (
        <div className="home">
            <div className="container">
                <section className="hero">
                    <h1 className="hero-title">
                        모든 웹 콘텐츠에
                        <br />
                        <span className="gradient-text">댓글을 달아보세요</span>
                    </h1>
                    <p className="hero-description">
                        YouTube, Netflix, 웹툰, 웹소설 등 모든 인터넷 콘텐츠에 실시간으로
                        댓글을 공유하고 소통할 수 있는 범용 댓글 플랫폼입니다.
                    </p>

                    <form className="url-input-form" onSubmit={handleUrlSubmit}>
                        <div className="url-input-wrapper">
                            <input
                                type="url"
                                className="url-input"
                                placeholder="댓글을 달고 싶은 URL을 입력하세요 (예: https://youtube.com/watch?v=...)"
                                value={url}
                                onChange={(e) => setUrl(e.target.value)}
                            />
                            <button type="submit" className="btn-url-submit">
                                댓글 보기
                            </button>
                        </div>
                    </form>

                    <div className="hero-actions">
                        <button className="btn-large btn-primary" onClick={handleGetStarted}>
                            시작하기
                        </button>
                        <button className="btn-large btn-secondary" onClick={handleLearnMore}>
                            더 알아보기
                        </button>
                    </div>
                </section>

                <section className="features">
                    <h2 className="section-title">주요 기능</h2>
                    <div className="features-grid">
                        <div className="feature-card">
                            <div className="feature-icon">🎯</div>
                            <h3>위치 기반 댓글</h3>
                            <p>
                                영상의 특정 시간이나 웹페이지의 스크롤 위치에 댓글을 달아
                                정확한 맥락을 공유하세요.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">🛡️</div>
                            <h3>스마트 필터링</h3>
                            <p>
                                스포일러, 광고, 불건전 댓글을 자동으로 차단하여 안전하게
                                콘텐츠를 즐기세요.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">💬</div>
                            <h3>실시간 소통</h3>
                            <p>
                                같은 콘텐츠를 보는 사용자들과 실시간으로 의견을 나누고
                                토론하세요.
                            </p>
                        </div>

                        <div className="feature-card">
                            <div className="feature-icon">🌐</div>
                            <h3>범용 플랫폼</h3>
                            <p>
                                모든 웹사이트와 스트리밍 서비스에서 사용 가능한 확장
                                프로그램을 제공합니다.
                            </p>
                        </div>
                    </div>
                </section>

                <section className="cta">
                    <div className="cta-content">
                        <h2>지금 바로 시작하세요</h2>
                        <p>무료로 가입하고 모든 기능을 이용해보세요.</p>
                        <button className="btn-large btn-primary" onClick={() => navigate('/register')}>
                            무료 회원가입
                        </button>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default Home;
