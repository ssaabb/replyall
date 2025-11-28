@echo off
chcp 65001 >nul
title 모두의 리뷰 - 개발 서버 실행
color 0A

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                    모두의 리뷰 (Everyone's Review)          ║
echo ║                     개발 서버 실행 중...                     ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM Node.js 설치 확인
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo [ERROR] Node.js가 설치되어 있지 않습니다!
    echo.
    echo Node.js를 설치해주세요: https://nodejs.org/
    echo.
    pause
    exit /b 1
)

echo [✓] Node.js 설치 확인 완료
node --version
echo.

REM node_modules 폴더 확인
if not exist "node_modules\" (
    echo [!] 의존성 패키지가 설치되어 있지 않습니다.
    echo [*] npm install을 실행합니다...
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo [ERROR] 패키지 설치에 실패했습니다.
        pause
        exit /b 1
    )
    echo.
    echo [✓] 패키지 설치 완료!
    echo.
) else (
    echo [✓] 의존성 패키지 확인 완료
    echo.
)

echo ════════════════════════════════════════════════════════════
echo  개발 서버를 시작합니다...
echo  브라우저가 자동으로 열립니다: http://localhost:3000
echo ════════════════════════════════════════════════════════════
echo.
echo  서버를 종료하려면 Ctrl+C를 누르세요.
echo.

REM 개발 서버 실행
npm run dev

pause
