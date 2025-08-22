@echo off
echo Generating icons from assets/icon.png...

REM Check if source icon exists
if not exist "assets\icon.png" (
    echo Warning: assets\icon.png not found!
    echo Creating fallback icon...
    
    REM Copy existing favicon as fallback if available
    if exist "..\web\public\android-chrome-512x512.png" (
        copy "..\web\public\android-chrome-512x512.png" "assets\icon.png"
    ) else (
        echo No fallback icon available, skipping icon generation
        exit /b 0
    )
)

REM Install png2icons if not available
where png2icons >nul 2>nul
if %errorlevel% neq 0 (
    echo Installing png2icons...
    npm install -g png2icons
)

REM Generate macOS icon (.icns)
echo Generating macOS icon (.icns)...
png2icons assets\icon.png assets\icon.icns -icns || echo Failed to generate .icns

REM Generate Windows icon (.ico)
echo Generating Windows icon (.ico)...
png2icons assets\icon.png assets\icon.ico -ico || echo Failed to generate .ico

echo Icon generation complete!
echo Generated files:
dir assets\
