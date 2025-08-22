# Desktop App Setup and Build Instructions

## Prerequisites

1. Node.js 18 or later
2. npm or yarn

## Development Setup

### 1. Install Dependencies

```bash
# Install web dependencies
cd web
npm install

# Install desktop dependencies  
cd ../desktop
npm install
```

### 2. Development Mode

```bash
# Terminal 1: Start web development server
cd web
npm run dev

# Terminal 2: Start Electron app in development mode
cd desktop
npm run electron-dev
```

### 3. Build for Production

```bash
# Build web app first
cd web
npm run build

# Copy web build and build desktop app
cd ../desktop
npm run build
```

## Platform-specific Builds

### Build for All Platforms
```bash
cd desktop
npm run build:all
```

### Build for Specific Platform
```bash
# macOS only
npm run build:electron -- --mac

# Windows only  
npm run build:electron -- --win

# Linux only
npm run build:electron -- --linux
```

## GitHub Actions

The project includes GitHub Actions workflow for automatic building:

- **Trigger**: Push to main branch, tags, or manual workflow dispatch
- **Platforms**: macOS, Windows, Linux
- **Artifacts**: Automatically uploaded as build artifacts
- **Releases**: Auto-created for git tags starting with 'v'

## File Structure

```
desktop/
├── main.js           # Main Electron process
├── preload.js        # Preload script for security
├── package.json      # Desktop app configuration
├── assets/           # App icons
│   ├── icon.icns    # macOS icon
│   ├── icon.ico     # Windows icon
│   └── icon.png     # Linux icon
└── release/         # Built applications (generated)
```

## Icon Requirements

Place appropriate icon files in the `desktop/assets/` directory:

- **macOS**: `icon.icns` (512x512, 256x256, 128x128, 64x64, 32x32, 16x16)
- **Windows**: `icon.ico` (256x256, 128x128, 64x64, 48x48, 32x32, 16x16)  
- **Linux**: `icon.png` (512x512)

## Features

- Cross-platform desktop application
- Native menu bar integration
- File system access for image processing
- Keyboard shortcuts
- Auto-updater support (configurable)
- Secure context isolation

## Troubleshooting

### Build Issues

1. **Permission errors on macOS**: Install Xcode Command Line Tools
2. **Missing dependencies**: Run `npm run postinstall` in desktop directory
3. **Icon errors**: Ensure icon files exist in correct formats

### Development Issues

1. **Hot reload not working**: Restart both web dev server and Electron
2. **Preload script errors**: Check console for context isolation issues
