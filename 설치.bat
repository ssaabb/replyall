@echo off
chcp 65001 >nul
title 모두의 리뷰 - 패키지 설치
color 0E

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                    모두의 리뷰 (Everyone's Review)          ║
echo ║                     패키지 설치 (npm install)               ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Node.js 설치 확인
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js가 설치되어 있지 않습니다!
    echo.
    echo Node.js를 다운로드하여 설치해주세요:
    echo https://nodejs.org/
    echo.
    echo 설치 후 이 파일을 다시 실행하세요.
    echo.
    pause
    exit /b 1
)

echo [✓] Node.js 버전:
node --version
echo.

echo [✓] npm 버전:
npm --version
echo.

echo ════════════════════════════════════════════════════════════
echo  패키지 설치를 시작합니다...
echo  이 작업은 몇 분 정도 걸릴 수 있습니다.
echo ════════════════════════════════════════════════════════════
echo.

REM npm install 실행
call npm install

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ════════════════════════════════════════════════════════════
    echo  [✓] 패키지 설치 완료!
    echo.
    echo  이제 "실행.bat" 파일을 실행하여 개발 서버를 시작할 수 있습니다.
    echo ════════════════════════════════════════════════════════════
) else (
    echo.
    echo [ERROR] 패키지 설치에 실패했습니다.
    echo.
    echo 인터넷 연결을 확인하고 다시 시도해주세요.
)

echo.
pause
