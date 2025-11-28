# TRD (Technical Requirements Document)
# 모두의 리뷰 (Everyone's Review)

## 1. 기술 스택 개요

### 1.1 프론트엔드
- **프레임워크**: React 18+
- **빌드 도구**: Vite
- **언어**: TypeScript
- **상태 관리**: Redux Toolkit + RTK Query
- **라우팅**: React Router v6
- **UI 라이브러리**: 
  - Material-UI (MUI) 또는 Ant Design (기본 컴포넌트)
  - Tailwind CSS (커스텀 스타일링)
- **폼 관리**: React Hook Form + Zod (유효성 검사)
- **애니메이션**: Framer Motion
- **아이콘**: React Icons
- **날짜/시간**: date-fns
- **에디터**: Draft.js 또는 Slate (리치 텍스트 에디터)

### 1.2 백엔드
- **런타임**: Node.js 20+
- **프레임워크**: Express.js 또는 Fastify
- **언어**: TypeScript
- **API**: RESTful API + WebSocket (실시간 기능)
- **인증**: JWT (JSON Web Tokens)
- **검증**: Joi 또는 Zod

### 1.3 데이터베이스
- **주 데이터베이스**: PostgreSQL 15+
  - 관계형 데이터 (사용자, 댓글, 대댓글)
- **캐시**: Redis
  - 세션 관리
  - 실시간 데이터 캐싱
  - Rate limiting
- **검색 엔진**: Elasticsearch (선택적)
  - 댓글 전문 검색

### 1.4 인프라 및 배포
- **컨테이너**: Docker + Docker Compose
- **클라우드**: AWS, GCP, 또는 Azure
- **CDN**: CloudFlare 또는 AWS CloudFront
- **CI/CD**: GitHub Actions
- **모니터링**: 
  - Sentry (에러 트래킹)
  - Google Analytics (사용자 분석)
- **로깅**: Winston + ELK Stack (선택적)

### 1.5 브라우저 확장 프로그램
- **Manifest**: V3
- **지원 브라우저**: Chrome, Firefox, Edge
- **통신**: Chrome Extension API + Message Passing

### 1.6 개발 도구
- **버전 관리**: Git + GitHub
- **코드 품질**: ESLint + Prettier
- **테스팅**:
  - Jest (유닛 테스트)
  - React Testing Library (컴포넌트 테스트)
  - Playwright (E2E 테스트)
- **API 문서**: Swagger/OpenAPI

---

## 2. 시스템 아키텍처

### 2.1 전체 아키텍처

```
┌─────────────────────────────────────────────────────────────┐
│                        클라이언트 레이어                        │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Web App    │  │   Browser    │  │   Mobile     │      │
│  │   (React)    │  │  Extension   │  │  (Future)    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS / WebSocket
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                         CDN / Load Balancer                  │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                        API Gateway                           │
├─────────────────────────────────────────────────────────────┤
│  - 인증/인가                                                  │
│  - Rate Limiting                                            │
│  - Request Validation                                       │
└─────────────────────────────────────────────────────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        ▼                   ▼                   ▼
┌──────────────┐  ┌──────────────┐  ┌──────────────┐
│   Auth       │  │   Comment    │  │   User       │
│   Service    │  │   Service    │  │   Service    │
└──────────────┘  └──────────────┘  └──────────────┘
        │                   │                   │
        └───────────────────┼───────────────────┘
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                        데이터 레이어                          │
├─────────────────────────────────────────────────────────────┤
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  PostgreSQL  │  │    Redis     │  │ Elasticsearch│      │
│  │   (Primary)  │  │   (Cache)    │  │   (Search)   │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 마이크로서비스 구조

#### 2.2.1 Auth Service
- **책임**: 사용자 인증 및 권한 관리
- **기능**:
  - 회원가입/로그인
  - JWT 토큰 발급 및 검증
  - 소셜 로그인 (OAuth 2.0)
  - 비밀번호 재설정
  - 세션 관리

#### 2.2.2 Comment Service
- **책임**: 댓글 관련 모든 기능
- **기능**:
  - 댓글 CRUD
  - 대댓글 관리
  - 위치 태깅 (타임스탬프/스크롤)
  - 좋아요/싫어요
  - 댓글 필터링
  - 실시간 댓글 업데이트 (WebSocket)

#### 2.2.3 User Service
- **책임**: 사용자 프로필 및 설정 관리
- **기능**:
  - 프로필 CRUD
  - 사용자 설정
  - 차단 목록 관리
  - 알림 설정
  - 활동 기록

#### 2.2.4 Content Service (선택적)
- **책임**: 콘텐츠 메타데이터 관리
- **기능**:
  - URL 정규화
  - 콘텐츠 정보 캐싱
  - 콘텐츠 통계

#### 2.2.5 Notification Service (선택적)
- **책임**: 알림 전송
- **기능**:
  - 인앱 알림
  - 푸시 알림
  - 이메일 알림
  - 알림 큐 관리

---

## 3. 데이터베이스 설계

### 3.1 ERD (Entity Relationship Diagram)

```
┌─────────────────┐         ┌─────────────────┐
│     users       │         │    comments     │
├─────────────────┤         ├─────────────────┤
│ id (PK)         │────┐    │ id (PK)         │
│ email           │    │    │ user_id (FK)    │
│ username        │    │    │ content_url     │
│ password_hash   │    │    │ content         │
│ profile_image   │    │    │ position_tag    │
│ bio             │    │    │ position_type   │
│ created_at      │    │    │ is_spoiler      │
│ updated_at      │    │    │ is_blocked      │
└─────────────────┘    │    │ parent_id (FK)  │
                       │    │ likes_count     │
                       │    │ created_at      │
                       │    │ updated_at      │
                       │    └─────────────────┘
                       │             │
                       └─────────────┘
                       
┌─────────────────┐         ┌─────────────────┐
│  comment_likes  │         │  user_blocks    │
├─────────────────┤         ├─────────────────┤
│ id (PK)         │         │ id (PK)         │
│ user_id (FK)    │         │ blocker_id (FK) │
│ comment_id (FK) │         │ blocked_id (FK) │
│ created_at      │         │ created_at      │
└─────────────────┘         └─────────────────┘

┌─────────────────┐         ┌─────────────────┐
│ comment_reports │         │  notifications  │
├─────────────────┤         ├─────────────────┤
│ id (PK)         │         │ id (PK)         │
│ comment_id (FK) │         │ user_id (FK)    │
│ reporter_id(FK) │         │ type            │
│ reason          │         │ content         │
│ created_at      │         │ is_read         │
└─────────────────┘         │ related_id      │
                            │ created_at      │
                            └─────────────────┘

┌─────────────────┐
│  user_settings  │
├─────────────────┤
│ id (PK)         │
│ user_id (FK)    │
│ hide_spoilers   │
│ hide_ads        │
│ filter_level    │
│ notifications   │
│ updated_at      │
└─────────────────┘
```

### 3.2 테이블 상세 설계

#### 3.2.1 users
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_image VARCHAR(500),
    bio TEXT,
    is_verified BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_username ON users(username);
```

#### 3.2.2 comments
```sql
CREATE TABLE comments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    content_url VARCHAR(2048) NOT NULL,
    content_url_hash VARCHAR(64) NOT NULL, -- URL의 해시값 (인덱싱용)
    content TEXT NOT NULL,
    position_tag VARCHAR(50), -- 타임스탬프 또는 스크롤 위치
    position_type VARCHAR(20), -- 'timestamp' 또는 'scroll'
    position_value DECIMAL(10, 2), -- 초 단위 또는 퍼센트
    is_spoiler BOOLEAN DEFAULT FALSE,
    is_blocked BOOLEAN DEFAULT FALSE,
    block_reason VARCHAR(50), -- 'spam', 'inappropriate', 'reported'
    parent_id UUID REFERENCES comments(id) ON DELETE CASCADE,
    likes_count INTEGER DEFAULT 0,
    dislikes_count INTEGER DEFAULT 0,
    reports_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    deleted_at TIMESTAMP -- Soft delete
);

CREATE INDEX idx_comments_content_url_hash ON comments(content_url_hash);
CREATE INDEX idx_comments_user_id ON comments(user_id);
CREATE INDEX idx_comments_parent_id ON comments(parent_id);
CREATE INDEX idx_comments_position ON comments(content_url_hash, position_value);
CREATE INDEX idx_comments_created_at ON comments(created_at DESC);
```

#### 3.2.3 comment_likes
```sql
CREATE TABLE comment_likes (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
    is_like BOOLEAN NOT NULL, -- TRUE: 좋아요, FALSE: 싫어요
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, comment_id)
);

CREATE INDEX idx_comment_likes_comment_id ON comment_likes(comment_id);
CREATE INDEX idx_comment_likes_user_id ON comment_likes(user_id);
```

#### 3.2.4 comment_reports
```sql
CREATE TABLE comment_reports (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    comment_id UUID NOT NULL REFERENCES comments(id) ON DELETE CASCADE,
    reporter_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    reason VARCHAR(50) NOT NULL, -- 'spam', 'inappropriate', 'spoiler'
    description TEXT,
    status VARCHAR(20) DEFAULT 'pending', -- 'pending', 'reviewed', 'actioned'
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(comment_id, reporter_id)
);

CREATE INDEX idx_comment_reports_comment_id ON comment_reports(comment_id);
CREATE INDEX idx_comment_reports_status ON comment_reports(status);
```

#### 3.2.5 user_blocks
```sql
CREATE TABLE user_blocks (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    blocker_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    blocked_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(blocker_id, blocked_id)
);

CREATE INDEX idx_user_blocks_blocker_id ON user_blocks(blocker_id);
```

#### 3.2.6 notifications
```sql
CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type VARCHAR(50) NOT NULL, -- 'reply', 'like', 'mention'
    content TEXT NOT NULL,
    related_comment_id UUID REFERENCES comments(id) ON DELETE CASCADE,
    related_user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_notifications_user_id ON notifications(user_id, is_read);
CREATE INDEX idx_notifications_created_at ON notifications(created_at DESC);
```

#### 3.2.7 user_settings
```sql
CREATE TABLE user_settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    hide_spoilers BOOLEAN DEFAULT TRUE,
    hide_ads BOOLEAN DEFAULT TRUE,
    hide_inappropriate BOOLEAN DEFAULT TRUE,
    filter_level VARCHAR(20) DEFAULT 'medium', -- 'low', 'medium', 'high'
    notify_replies BOOLEAN DEFAULT TRUE,
    notify_likes BOOLEAN DEFAULT FALSE,
    notify_mentions BOOLEAN DEFAULT TRUE,
    email_notifications BOOLEAN DEFAULT FALSE,
    push_notifications BOOLEAN DEFAULT FALSE,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_user_settings_user_id ON user_settings(user_id);
```

### 3.3 Redis 캐싱 전략

#### 3.3.1 캐시 키 구조
```
# 사용자 세션
session:{user_id} -> { token, expires_at }

# 댓글 목록 (URL별)
comments:{url_hash}:page:{page_num} -> [comment_ids]

# 댓글 상세
comment:{comment_id} -> { comment_data }

# 사용자 프로필
user:{user_id} -> { user_data }

# 실시간 활성 사용자 (URL별)
active_users:{url_hash} -> Set<user_id>

# Rate limiting
rate_limit:{user_id}:{action} -> count
```

#### 3.3.2 TTL 설정
- 세션: 7일
- 댓글 목록: 5분
- 댓글 상세: 10분
- 사용자 프로필: 30분
- 활성 사용자: 1분
- Rate limit: 1시간

---

## 4. API 설계

### 4.1 API 엔드포인트

#### 4.1.1 인증 (Auth)
```
POST   /api/auth/register          # 회원가입
POST   /api/auth/login             # 로그인
POST   /api/auth/logout            # 로그아웃
POST   /api/auth/refresh           # 토큰 갱신
POST   /api/auth/forgot-password   # 비밀번호 찾기
POST   /api/auth/reset-password    # 비밀번호 재설정
GET    /api/auth/verify-email      # 이메일 인증
POST   /api/auth/social/google     # Google 소셜 로그인
POST   /api/auth/social/github     # GitHub 소셜 로그인
```

#### 4.1.2 댓글 (Comments)
```
GET    /api/comments                      # 댓글 목록 조회
POST   /api/comments                      # 댓글 작성
GET    /api/comments/:id                  # 댓글 상세 조회
PUT    /api/comments/:id                  # 댓글 수정
DELETE /api/comments/:id                  # 댓글 삭제
POST   /api/comments/:id/like             # 좋아요
DELETE /api/comments/:id/like             # 좋아요 취소
POST   /api/comments/:id/dislike          # 싫어요
POST   /api/comments/:id/report           # 신고
GET    /api/comments/:id/replies          # 대댓글 목록
POST   /api/comments/:id/replies          # 대댓글 작성
```

#### 4.1.3 사용자 (Users)
```
GET    /api/users/me                      # 내 프로필 조회
PUT    /api/users/me                      # 내 프로필 수정
GET    /api/users/:id                     # 사용자 프로필 조회
GET    /api/users/me/comments             # 내가 쓴 댓글
GET    /api/users/me/likes                # 좋아요한 댓글
POST   /api/users/me/blocks               # 사용자 차단
DELETE /api/users/me/blocks/:userId       # 차단 해제
GET    /api/users/me/blocks               # 차단 목록
```

#### 4.1.4 설정 (Settings)
```
GET    /api/settings                      # 설정 조회
PUT    /api/settings                      # 설정 수정
```

#### 4.1.5 알림 (Notifications)
```
GET    /api/notifications                 # 알림 목록
PUT    /api/notifications/:id/read        # 알림 읽음 처리
DELETE /api/notifications/:id             # 알림 삭제
PUT    /api/notifications/read-all        # 모두 읽음 처리
```

#### 4.1.6 콘텐츠 (Content)
```
GET    /api/content/info                  # 콘텐츠 정보 조회 (URL 기반)
GET    /api/content/stats                 # 콘텐츠 통계
```

### 4.2 API 요청/응답 예시

#### 4.2.1 댓글 목록 조회
**Request**
```http
GET /api/comments?url=https://youtube.com/watch?v=abc123&page=1&limit=50&sort=time
Authorization: Bearer {token}
```

**Response**
```json
{
  "success": true,
  "data": {
    "comments": [
      {
        "id": "uuid-1",
        "user": {
          "id": "user-uuid",
          "username": "user123",
          "profileImage": "https://..."
        },
        "content": "정말 재미있는 영상이네요!",
        "positionTag": "03:25",
        "positionType": "timestamp",
        "positionValue": 205,
        "isSpoiler": false,
        "likesCount": 15,
        "dislikesCount": 2,
        "repliesCount": 3,
        "createdAt": "2024-01-15T10:30:00Z",
        "updatedAt": "2024-01-15T10:30:00Z"
      }
    ],
    "pagination": {
      "currentPage": 1,
      "totalPages": 10,
      "totalComments": 487,
      "hasNext": true
    }
  }
}
```

#### 4.2.2 댓글 작성
**Request**
```http
POST /api/comments
Authorization: Bearer {token}
Content-Type: application/json

{
  "contentUrl": "https://youtube.com/watch?v=abc123",
  "content": "이 부분 정말 감동적이에요 ㅠㅠ",
  "positionTag": "05:42",
  "positionType": "timestamp",
  "positionValue": 342,
  "isSpoiler": false
}
```

**Response**
```json
{
  "success": true,
  "data": {
    "id": "uuid-2",
    "user": {
      "id": "user-uuid",
      "username": "user123",
      "profileImage": "https://..."
    },
    "content": "이 부분 정말 감동적이에요 ㅠㅠ",
    "positionTag": "05:42",
    "positionType": "timestamp",
    "positionValue": 342,
    "isSpoiler": false,
    "likesCount": 0,
    "dislikesCount": 0,
    "repliesCount": 0,
    "createdAt": "2024-01-15T11:00:00Z",
    "updatedAt": "2024-01-15T11:00:00Z"
  }
}
```

### 4.3 WebSocket 이벤트

#### 4.3.1 연결
```javascript
// 클라이언트 -> 서버
{
  "type": "join",
  "data": {
    "contentUrl": "https://youtube.com/watch?v=abc123",
    "token": "jwt-token"
  }
}

// 서버 -> 클라이언트
{
  "type": "joined",
  "data": {
    "activeUsers": 42
  }
}
```

#### 4.3.2 새 댓글 알림
```javascript
// 서버 -> 클라이언트
{
  "type": "new_comment",
  "data": {
    "comment": { /* comment object */ }
  }
}
```

#### 4.3.3 좋아요 업데이트
```javascript
// 서버 -> 클라이언트
{
  "type": "like_update",
  "data": {
    "commentId": "uuid",
    "likesCount": 16
  }
}
```

---

## 5. 프론트엔드 아키텍처

### 5.1 폴더 구조
```
src/
├── assets/              # 정적 파일 (이미지, 폰트 등)
├── components/          # 재사용 가능한 컴포넌트
│   ├── common/          # 공통 컴포넌트
│   │   ├── Button/
│   │   ├── Input/
│   │   ├── Modal/
│   │   └── ...
│   ├── comment/         # 댓글 관련 컴포넌트
│   │   ├── CommentItem/
│   │   ├── CommentList/
│   │   ├── CommentForm/
│   │   ├── ReplyList/
│   │   └── ...
│   └── layout/          # 레이아웃 컴포넌트
│       ├── Header/
│       ├── Sidebar/
│       └── Footer/
├── features/            # 기능별 모듈 (Redux slices)
│   ├── auth/
│   ├── comments/
│   ├── users/
│   └── notifications/
├── hooks/               # 커스텀 훅
│   ├── useAuth.ts
│   ├── useComments.ts
│   ├── useWebSocket.ts
│   └── ...
├── pages/               # 페이지 컴포넌트
│   ├── Home/
│   ├── Comments/
│   ├── Profile/
│   ├── Settings/
│   └── ...
├── services/            # API 서비스
│   ├── api.ts
│   ├── authService.ts
│   ├── commentService.ts
│   └── ...
├── store/               # Redux store 설정
│   └── index.ts
├── types/               # TypeScript 타입 정의
│   ├── comment.ts
│   ├── user.ts
│   └── ...
├── utils/               # 유틸리티 함수
│   ├── urlParser.ts
│   ├── timeFormatter.ts
│   └── ...
├── App.tsx
└── main.tsx
```

### 5.2 주요 컴포넌트 설계

#### 5.2.1 CommentList
```typescript
interface CommentListProps {
  contentUrl: string;
  currentPosition?: number; // 타임스탬프 또는 스크롤 위치
  sortBy?: 'time' | 'popular' | 'relevant';
  filterSpoilers?: boolean;
}

const CommentList: React.FC<CommentListProps> = ({
  contentUrl,
  currentPosition,
  sortBy = 'relevant',
  filterSpoilers = true
}) => {
  // 구현
};
```

#### 5.2.2 CommentItem
```typescript
interface CommentItemProps {
  comment: Comment;
  onLike: (commentId: string) => void;
  onReply: (commentId: string, content: string) => void;
  onReport: (commentId: string, reason: string) => void;
  showReplies?: boolean;
}

const CommentItem: React.FC<CommentItemProps> = ({
  comment,
  onLike,
  onReply,
  onReport,
  showReplies = true
}) => {
  // 구현
};
```

#### 5.2.3 CommentForm
```typescript
interface CommentFormProps {
  contentUrl: string;
  currentPosition?: number;
  positionType?: 'timestamp' | 'scroll';
  parentId?: string; // 대댓글인 경우
  onSubmit: (comment: CreateCommentDto) => void;
}

const CommentForm: React.FC<CommentFormProps> = ({
  contentUrl,
  currentPosition,
  positionType,
  parentId,
  onSubmit
}) => {
  // 구현
};
```

### 5.3 상태 관리 (Redux Slices)

#### 5.3.1 commentsSlice
```typescript
interface CommentsState {
  comments: Comment[];
  loading: boolean;
  error: string | null;
  currentUrl: string | null;
  currentPosition: number | null;
  filters: {
    hideSpoilers: boolean;
    hideAds: boolean;
    hideInappropriate: boolean;
  };
  sort: 'time' | 'popular' | 'relevant';
}

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    setCurrentUrl,
    setCurrentPosition,
    setFilters,
    setSort,
    // ...
  },
  extraReducers: (builder) => {
    // RTK Query integration
  }
});
```

### 5.4 커스텀 훅

#### 5.4.1 useWebSocket
```typescript
const useWebSocket = (contentUrl: string) => {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  
  useEffect(() => {
    // WebSocket 연결 로직
  }, [contentUrl]);
  
  return { socket, isConnected };
};
```

#### 5.4.2 usePositionTracker
```typescript
const usePositionTracker = (type: 'timestamp' | 'scroll') => {
  const [position, setPosition] = useState<number>(0);
  
  useEffect(() => {
    // 위치 추적 로직
  }, [type]);
  
  return position;
};
```

---

## 6. 브라우저 확장 프로그램

### 6.1 Manifest V3 구조
```json
{
  "manifest_version": 3,
  "name": "모두의 리뷰",
  "version": "1.0.0",
  "description": "모든 웹 콘텐츠에 댓글을 달 수 있는 범용 댓글 플랫폼",
  "permissions": [
    "activeTab",
    "storage",
    "tabs"
  ],
  "host_permissions": [
    "https://*/*"
  ],
  "action": {
    "default_popup": "popup.html",
    "default_icon": {
      "16": "icons/icon16.png",
      "48": "icons/icon48.png",
      "128": "icons/icon128.png"
    }
  },
  "content_scripts": [
    {
      "matches": ["<all_urls>"],
      "js": ["content.js"],
      "css": ["content.css"]
    }
  ],
  "background": {
    "service_worker": "background.js"
  }
}
```

### 6.2 Content Script
- 현재 페이지 URL 감지
- 영상 플레이어 감지 및 타임스탬프 추출
- 스크롤 위치 추적
- 사이드바 또는 오버레이 주입

### 6.3 Background Script
- 메시지 전달
- 스토리지 관리
- API 통신

---

## 7. 보안 요구사항

### 7.1 인증 및 권한
- JWT 기반 인증
- Access Token (15분) + Refresh Token (7일)
- HTTPS Only 쿠키
- CORS 설정

### 7.2 입력 검증
- 모든 사용자 입력 검증 (프론트엔드 + 백엔드)
- XSS 방지: DOMPurify 사용
- SQL Injection 방지: Parameterized Queries
- CSRF 방지: CSRF 토큰

### 7.3 Rate Limiting
```
- 댓글 작성: 사용자당 분당 5개
- 좋아요: 사용자당 분당 20개
- API 요청: IP당 분당 100개
```

### 7.4 데이터 암호화
- 비밀번호: bcrypt (salt rounds: 12)
- 전송 중 데이터: TLS 1.3
- 민감한 데이터: AES-256 암호화

---

## 8. 성능 최적화

### 8.1 프론트엔드
- Code Splitting (React.lazy)
- 이미지 최적화 (WebP, lazy loading)
- Virtual Scrolling (react-window)
- Memoization (React.memo, useMemo)
- Debouncing/Throttling

### 8.2 백엔드
- Database Indexing
- Query Optimization
- Connection Pooling
- Caching (Redis)
- CDN for Static Assets

### 8.3 네트워크
- HTTP/2
- Gzip/Brotli Compression
- API Response Pagination
- WebSocket for Real-time Updates

---

## 9. 테스팅 전략

### 9.1 유닛 테스트
- 모든 유틸리티 함수
- Redux reducers
- 커스텀 훅
- 목표: 80% 이상 커버리지

### 9.2 통합 테스트
- API 엔드포인트
- 데이터베이스 쿼리
- 인증 플로우

### 9.3 E2E 테스트
- 사용자 시나리오 (Playwright)
  - 회원가입 → 로그인 → 댓글 작성 → 대댓글 작성
  - 필터 설정 → 댓글 차단
  - 좋아요 → 알림 확인

### 9.4 성능 테스트
- Load Testing (Artillery, k6)
- 동시 접속자 1000명 시뮬레이션
- API 응답 시간 측정

---

## 10. 배포 및 CI/CD

### 10.1 CI/CD 파이프라인
```yaml
# .github/workflows/deploy.yml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - Checkout
      - Install dependencies
      - Run linter
      - Run tests
      - Build

  deploy:
    needs: test
    runs-on: ubuntu-latest
    steps:
      - Build Docker image
      - Push to registry
      - Deploy to production
```

### 10.2 환경 구성
- **Development**: 로컬 개발 환경
- **Staging**: 프로덕션과 동일한 환경에서 테스트
- **Production**: 실제 서비스 환경

### 10.3 모니터링
- **에러 트래킹**: Sentry
- **로그 수집**: CloudWatch / ELK
- **성능 모니터링**: New Relic / Datadog
- **Uptime 모니터링**: UptimeRobot

---

## 11. 확장 계획

### 11.1 Phase 1 기술 스택
- React + Vite
- Express.js
- PostgreSQL + Redis
- Docker

### 11.2 Phase 2 고려사항
- GraphQL (Apollo Server)
- Microservices (Kubernetes)
- Message Queue (RabbitMQ / Kafka)
- Elasticsearch (전문 검색)

### 11.3 Phase 3 고려사항
- AI/ML (댓글 감정 분석, 자동 필터링)
- Mobile App (React Native)
- Video SDK Integration (직접 플레이어 제공)

---

## 12. 개발 일정

### 12.1 Phase 1 (MVP - 3개월)
- **Week 1-2**: 프로젝트 셋업, DB 설계
- **Week 3-4**: 인증 시스템 구현
- **Week 5-8**: 댓글 CRUD, 위치 태깅
- **Week 9-10**: 대댓글, 좋아요 기능
- **Week 11-12**: 기본 필터링, 테스트, 배포

### 12.2 Phase 2 (4-6개월)
- 브라우저 확장 프로그램
- 고급 필터링
- 알림 시스템
- 모바일 최적화

### 12.3 Phase 3 (7-12개월)
- 통계 대시보드
- AI 기반 필터링
- 소셜 기능
- API 공개

---

## 13. 부록

### 13.1 기술 선택 이유

#### React
- 대규모 커뮤니티 및 생태계
- 컴포넌트 재사용성
- Virtual DOM을 통한 성능 최적화

#### TypeScript
- 타입 안정성
- 개발 생산성 향상
- 유지보수 용이

#### PostgreSQL
- ACID 보장
- 복잡한 쿼리 지원
- JSON 타입 지원

#### Redis
- 빠른 읽기/쓰기
- 다양한 데이터 구조
- Pub/Sub 지원

### 13.2 참고 자료
- React 공식 문서: https://react.dev
- PostgreSQL 문서: https://www.postgresql.org/docs/
- Redis 문서: https://redis.io/docs/
- JWT 베스트 프랙티스: https://tools.ietf.org/html/rfc8725
