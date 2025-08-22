#!/bin/bash

# Install png2icons globally if not already installed
if ! command -v png2icons &> /dev/null; then
    echo "Installing png2icons..."
    npm install -g png2icons
fi

# Navigate to desktop directory
cd "$(dirname "$0")"

# Check if source icon exists, if not create a simple fallback
if [ ! -f "assets/icon.png" ]; then
    echo "Warning: assets/icon.png not found!"
    echo "Creating fallback icon..."
    
    # Create a simple fallback icon using ImageMagick if available
    if command -v convert &> /dev/null; then
        convert -size 512x512 xc:white -gravity center -pointsize 72 -annotate +0+0 "EXIF" assets/icon.png
    else
        echo "Creating minimal fallback icons..."
        # Copy existing favicon as fallback
        if [ -f "../web/public/android-chrome-512x512.png" ]; then
            cp "../web/public/android-chrome-512x512.png" "assets/icon.png"
        else
            echo "No fallback icon available, skipping icon generation"
            exit 0
        fi
    fi
fi

echo "Generating icons from assets/icon.png..."

# Generate macOS icon (.icns)
echo "Generating macOS icon (.icns)..."
png2icons assets/icon.png assets/icon.icns -icns || echo "Failed to generate .icns"

# Generate Windows icon (.ico)  
echo "Generating Windows icon (.ico)..."
png2icons assets/icon.png assets/icon.ico -ico || echo "Failed to generate .ico"

echo "Icon generation complete!"
echo "Generated files:"
ls -la assets/
