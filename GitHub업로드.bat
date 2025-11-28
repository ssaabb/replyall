@echo off
chcp 65001 >nul
title GitHub 업로드 - 모두의 리뷰
color 0B

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║              GitHub에 프로젝트 업로드하기                    ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Git 설치 확인
where git >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git이 설치되어 있지 않거나 PATH에 등록되지 않았습니다!
    echo.
    echo Git을 설치한 후 PowerShell을 재시작하세요.
    echo 또는 컴퓨터를 재시작해주세요.
    echo.
    pause
    exit /b 1
)

echo [✓] Git 버전:
git --version
echo.

echo ════════════════════════════════════════════════════════════
echo  Git 저장소 초기화 중...
echo ════════════════════════════════════════════════════════════
echo.

REM Git 초기화
git init
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Git 초기화 실패
    pause
    exit /b 1
)
echo [✓] Git 저장소 초기화 완료
echo.

REM Git 사용자 설정
echo [*] Git 사용자 정보 설정 중...
git config user.name "ssaabb"
git config user.email "ssaabb@users.noreply.github.com"
echo [✓] 사용자 정보 설정 완료
echo.

REM 파일 추가
echo [*] 파일 추가 중...
git add .
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] 파일 추가 실패
    pause
    exit /b 1
)
echo [✓] 모든 파일 추가 완료
echo.

REM 커밋
echo [*] 커밋 생성 중...
git commit -m "Initial commit: 모두의 리뷰 프로젝트 초기화"
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] 커밋 생성 실패
    pause
    exit /b 1
)
echo [✓] 커밋 생성 완료
echo.

REM 브랜치 이름 변경
echo [*] 기본 브랜치를 main으로 설정 중...
git branch -M main
echo [✓] 브랜치 설정 완료
echo.

REM 원격 저장소 추가
echo [*] GitHub 저장소 연결 중...
git remote add origin https://github.com/ssaabb/replyall.git
if %ERRORLEVEL% NEQ 0 (
    echo [!] 원격 저장소가 이미 존재할 수 있습니다.
    echo [*] 기존 원격 저장소 제거 후 재시도...
    git remote remove origin
    git remote add origin https://github.com/ssaabb/replyall.git
)
echo [✓] 원격 저장소 연결 완료
echo.

echo ════════════════════════════════════════════════════════════
echo  GitHub에 업로드 중...
echo ════════════════════════════════════════════════════════════
echo.
echo [!] GitHub 로그인이 필요합니다.
echo.
echo     사용자 이름: ssaabb
echo     비밀번호: Personal Access Token 입력
echo.
echo     Token 생성 방법:
echo     1. https://github.com/settings/tokens 접속
echo     2. "Generate new token (classic)" 클릭
echo     3. "repo" 권한 선택
echo     4. 생성된 토큰을 복사하여 비밀번호로 사용
echo.
echo ════════════════════════════════════════════════════════════
echo.

REM GitHub에 푸시
git push -u origin main

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ════════════════════════════════════════════════════════════
    echo  [✓] 업로드 완료!
    echo.
    echo  저장소 주소: https://github.com/ssaabb/replyall
    echo ════════════════════════════════════════════════════════════
    echo.
) else (
    echo.
    echo [ERROR] 업로드 실패
    echo.
    echo 가능한 원인:
    echo  - GitHub 저장소가 존재하지 않음
    echo  - 인증 실패 (Token 확인 필요)
    echo  - 네트워크 연결 문제
    echo.
)

echo.
pause
