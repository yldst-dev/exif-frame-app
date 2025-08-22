#!/bin/bash

# EXIF Frame Desktop Setup Script

echo "🖼️  EXIF Frame Desktop Setup"
echo "=============================="

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18 or later."
    echo "   Download from: https://nodejs.org/"
    exit 1
fi

# Check Node.js version
NODE_VERSION=$(node --version | cut -d'v' -f2 | cut -d'.' -f1)
if [ "$NODE_VERSION" -lt 18 ]; then
    echo "❌ Node.js version 18 or later is required. Current version: $(node --version)"
    exit 1
fi

echo "✅ Node.js $(node --version) detected"

# Install web dependencies
echo ""
echo "📦 Installing web dependencies..."
cd web
npm install
cd ..

# Install desktop dependencies
echo ""
echo "🖥️  Installing desktop dependencies..."
cd desktop
npm install

# Generate icons (if source icon exists)
if [ -f "assets/icon.png" ]; then
    echo ""
    echo "🎨 Generating app icons..."
    npm run generate-icons
else
    echo ""
    echo "⚠️  No source icon found at assets/icon.png"
    echo "   Please add a 512x512 PNG icon to generate platform-specific icons"
fi

echo ""
echo "✅ Setup complete!"
echo ""
echo "🚀 To start development:"
echo "   1. Terminal 1: cd web && npm run dev"
echo "   2. Terminal 2: cd desktop && npm run electron-dev"
echo ""
echo "📦 To build desktop app:"
echo "   cd desktop && npm run dist"
