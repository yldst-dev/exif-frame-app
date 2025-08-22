@echo off
echo Generating icons from assets/icon.png...

REM Check if source icon exists
if not exist "assets\icon.png" (
    echo Error: assets\icon.png not found!
    echo Please ensure you have a 512x512 PNG icon in the assets directory.
    exit /b 1
)

REM Install png2icons if not available
where png2icons >nul 2>nul
if %errorlevel% neq 0 (
    echo Installing png2icons...
    npm install -g png2icons
)

REM Generate macOS icon (.icns)
echo Generating macOS icon (.icns)...
png2icons assets\icon.png assets\icon.icns -icns

REM Generate Windows icon (.ico)
echo Generating Windows icon (.ico)...
png2icons assets\icon.png assets\icon.ico -ico

echo Icon generation complete!
echo Generated files:
echo   - assets\icon.icns (macOS)
echo   - assets\icon.ico (Windows)
echo   - assets\icon.png (Linux - already exists)
