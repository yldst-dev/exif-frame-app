@echo off
echo.
echo 🖼️  EXIF Frame Desktop Setup
echo ==============================

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18 or later.
    echo    Download from: https://nodejs.org/
    pause
    exit /b 1
)

echo ✅ Node.js detected
echo.

REM Install web dependencies
echo 📦 Installing web dependencies...
cd web
call npm install
cd ..

REM Install desktop dependencies
echo.
echo 🖥️  Installing desktop dependencies...
cd desktop
call npm install

REM Check for icon file
if exist "assets\icon.png" (
    echo.
    echo 🎨 Generating app icons...
    call npm run generate-icons
) else (
    echo.
    echo ⚠️  No source icon found at assets\icon.png
    echo    Please add a 512x512 PNG icon to generate platform-specific icons
)

echo.
echo ✅ Setup complete!
echo.
echo 🚀 To start development:
echo    1. Terminal 1: cd web ^&^& npm run dev
echo    2. Terminal 2: cd desktop ^&^& npm run electron-dev
echo.
echo 📦 To build desktop app:
echo    cd desktop ^&^& npm run dist
echo.
pause
