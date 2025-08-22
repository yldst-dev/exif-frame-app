#!/bin/bash

# Install png2icons globally if not already installed
if ! command -v png2icons &> /dev/null; then
    echo "Installing png2icons..."
    npm install -g png2icons
fi

# Navigate to desktop directory
cd "$(dirname "$0")"

# Check if source icon exists
if [ ! -f "assets/icon.png" ]; then
    echo "Error: assets/icon.png not found!"
    echo "Please ensure you have a 512x512 PNG icon in the assets directory."
    exit 1
fi

echo "Generating icons from assets/icon.png..."

# Generate macOS icon (.icns)
echo "Generating macOS icon (.icns)..."
png2icons assets/icon.png assets/icon.icns -icns

# Generate Windows icon (.ico)  
echo "Generating Windows icon (.ico)..."
png2icons assets/icon.png assets/icon.ico -ico

echo "Icon generation complete!"
echo "Generated files:"
echo "  - assets/icon.icns (macOS)"
echo "  - assets/icon.ico (Windows)"
echo "  - assets/icon.png (Linux - already exists)"
