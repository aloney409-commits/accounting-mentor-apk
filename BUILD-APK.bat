@echo off
REM ===================================================
REM  Accounting Mentor - One-Click APK Builder
REM  For Windows 10 / 11
REM ===================================================
setlocal enabledelayedexpansion

echo.
echo ================================================
echo   Accounting Mentor - APK Builder
echo ================================================
echo.

REM Check Node.js
where node >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Node.js not found. Install from https://nodejs.org
    pause
    exit /b 1
)

REM Check Java
where java >nul 2>nul
if errorlevel 1 (
    echo [ERROR] Java (JDK 17) not found. Install from https://adoptium.net
    pause
    exit /b 1
)

echo [1/5] Installing npm dependencies...
call npm install
if errorlevel 1 goto :error

echo.
echo [2/5] Building Next.js static export...
call npm run build
if errorlevel 1 goto :error

echo.
echo [3/5] Adding Android platform (if not already added)...
if not exist "android" (
    call npx cap add android
    if errorlevel 1 goto :error
) else (
    echo    Android platform already exists, skipping.
)

echo.
echo [4/5] Syncing web assets to Android project...
call npx cap sync android
if errorlevel 1 goto :error

echo.
echo [5/5] Building debug APK with Gradle...
cd android
call gradlew.bat assembleDebug
if errorlevel 1 (
    cd ..
    goto :error
)
cd ..

echo.
echo ================================================
echo   SUCCESS!
echo ================================================
echo.
echo Your APK is ready at:
echo   android\app\build\outputs\apk\debug\app-debug.apk
echo.
echo To install on connected phone: adb install android\app\build\outputs\apk\debug\app-debug.apk
echo.
pause
exit /b 0

:error
echo.
echo ================================================
echo   BUILD FAILED
echo ================================================
echo Check the error above. See APK-BUILD-GUIDE.md for troubleshooting.
pause
exit /b 1
