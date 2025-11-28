# GitHub 업로드 가이드

## 🚀 방법 1: 배치 파일 사용 (가장 쉬움)

1. **GitHub업로드.bat** 파일을 더블클릭
2. GitHub Personal Access Token 입력
3. 완료!

---

## 🔐 GitHub Personal Access Token 생성

업로드 시 비밀번호 대신 Token을 사용해야 합니다.

### Token 생성 방법

1. **GitHub 로그인** 후 다음 링크 접속:
   https://github.com/settings/tokens

2. **"Generate new token (classic)"** 클릭

3. **Token 설정**:
   - Note: `Replyall Project`
   - Expiration: `90 days` (또는 원하는 기간)
   - Select scopes: ✅ **repo** (전체 선택)

4. **"Generate token"** 클릭

5. **생성된 Token 복사** (한 번만 표시됩니다!)
   - 예: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

6. **안전한 곳에 저장** (메모장 등)

---

## 📝 방법 2: 수동 명령어 실행

새 PowerShell 창을 열고 다음 명령어를 순서대로 실행:

```powershell
# 1. 프로젝트 폴더로 이동
cd c:\Replyall

# 2. Git 저장소 초기화
git init

# 3. Git 사용자 정보 설정
git config user.name "ssaabb"
git config user.email "ssaabb@users.noreply.github.com"

# 4. 모든 파일 추가
git add .

# 5. 첫 커밋
git commit -m "Initial commit: 모두의 리뷰 프로젝트 초기화"

# 6. 기본 브랜치를 main으로 설정
git branch -M main

# 7. GitHub 저장소 연결
git remote add origin https://github.com/ssaabb/replyall.git

# 8. GitHub에 푸시
git push -u origin main
```

**로그인 정보 입력:**
- Username: `ssaabb`
- Password: `생성한 Personal Access Token 붙여넣기`

---

## ⚠️ 문제 해결

### "Git을 찾을 수 없습니다" 오류

1. PowerShell을 **완전히 종료**
2. PowerShell을 **관리자 권한으로 재실행**
3. 또는 **컴퓨터 재시작**

### "remote origin already exists" 오류

```powershell
git remote remove origin
git remote add origin https://github.com/ssaabb/replyall.git
git push -u origin main
```

### "repository not found" 오류

GitHub에서 저장소를 먼저 생성해야 합니다:

1. https://github.com/new 접속
2. Repository name: `replyall`
3. Public 또는 Private 선택
4. **"Create repository"** 클릭 (README 추가 안 함)
5. 다시 `git push` 실행

### 인증 실패

- Personal Access Token이 올바른지 확인
- Token에 `repo` 권한이 있는지 확인
- Token이 만료되지 않았는지 확인

---

## ✅ 업로드 완료 후 확인

업로드가 성공하면 다음 주소에서 확인 가능:

**https://github.com/ssaabb/replyall**

---

## 📦 업로드되는 파일 목록

- ✅ 소스 코드 (`src/` 폴더)
- ✅ 설정 파일 (`package.json`, `vite.config.ts` 등)
- ✅ 문서 (`README.md`, `PRD.md`, `TRD.md`)
- ✅ 배치 파일 (`실행.bat`, `빌드.bat` 등)
- ❌ `node_modules/` (`.gitignore`로 제외됨)
- ❌ `dist/` (빌드 결과물, 제외됨)

---

## 🎯 다음 단계

업로드 후 할 수 있는 작업:

1. **README.md 업데이트**
   - 프로젝트 스크린샷 추가
   - 설치 방법 상세화

2. **GitHub Pages 배포**
   - Settings → Pages
   - Source: GitHub Actions
   - Vite 앱 배포

3. **Issues & Projects 활용**
   - 버그 트래킹
   - 기능 요청 관리

4. **협업 시작**
   - Collaborators 추가
   - Pull Request 워크플로우 설정
