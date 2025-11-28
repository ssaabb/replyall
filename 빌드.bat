@echo off
chcp 65001 >nul
title 모두의 리뷰 - 프로덕션 빌드
color 0B

echo.
echo ╔════════════════════════════════════════════════════════════╗
echo ║                    모두의 리뷰 (Everyone's Review)          ║
echo ║                     프로덕션 빌드 생성                       ║
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
echo  프로덕션 빌드를 시작합니다...
echo ════════════════════════════════════════════════════════════
echo.

REM 빌드 실행
call npm run build

if %ERRORLEVEL% EQU 0 (
    echo.
    echo ════════════════════════════════════════════════════════════
    echo  [✓] 빌드 완료!
    echo.
    echo  빌드된 파일 위치: dist 폴더
    echo  웹 서버에 dist 폴더의 내용을 업로드하세요.
    echo ════════════════════════════════════════════════════════════
    echo.
    
    REM dist 폴더 열기
    if exist "dist\" (
        echo  dist 폴더를 여시겠습니까? (Y/N)
        choice /C YN /N /M "선택: "
        if errorlevel 2 goto :end
        if errorlevel 1 explorer dist
    )
) else (
    echo.
    echo [ERROR] 빌드에 실패했습니다.
    echo.
)

:end
echo.
pause
