@echo off
chcp 65001 >nul
title 모두의 리뷰 - 빌드 미리보기
color 0D

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                    모두의 리뷰 (Everyone's Review)          ║
echo ║                     빌드 미리보기 (Preview)                 ║
echo ╚════════════════════════════════════════════════════════════╝
echo.

REM dist 폴더 확인
if not exist "dist\" (
    echo [ERROR] dist 폴더가 없습니다!
    echo.
    echo 먼저 "빌드.bat" 파일을 실행하여 프로덕션 빌드를 생성하세요.
    echo.
    pause
    exit /b 1
)

echo [✓] 빌드 파일 확인 완료
echo.

echo ════════════════════════════════════════════════════════════
echo  빌드 미리보기 서버를 시작합니다...
echo  브라우저에서 http://localhost:4173 을 열어주세요.
echo ════════════════════════════════════════════════════════════
echo.
echo  서버를 종료하려면 Ctrl+C를 누르세요.
echo.

REM 미리보기 서버 실행
npm run preview

pause
