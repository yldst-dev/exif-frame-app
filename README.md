<p align="center">
  <img src="https://github.com/yurucam/exif-frame/assets/25793226/b9de5dc3-344a-4a3f-8cfb-ed4c82404cea" alt="album and camera" width=200px />
</p>

<h1 align="center"><a href="https://exif-frame.yuru.cam">EXIF Frame</a></h1>

<p align="center">
  📸 → 🖼️ with EXIF metadata
</p>

<p align="center">
  <a href="https://play.google.com/store/apps/details?id=com.yurucam.exif"><img src="https://github.com/yurucam/exif-frame/assets/25793226/9be351a3-6c57-4033-a9e4-d95595a26dcd" width="200px" /></a>
  <a href="https://apps.apple.com/kr/app/exif-%ED%94%84%EB%A0%88%EC%9E%84/id6494989030"><img src="https://github.com/yurucam/exif-frame/assets/25793226/54f6d50f-e5f7-4b46-8bb0-5a646fce0dca" width="200px" /></a>
<p/>

<p align="center">
  <img src="https://github.com/yurucam/exif-frame/assets/25793226/9c992235-709b-46a6-9986-64f9bf7af288" width="400px" />
  <img src="https://github.com/yurucam/exif-frame/assets/25793226/415f3838-38f0-43c8-a5b2-55afa32b6659" width="400px" />
  <img src="https://github.com/yurucam/exif-frame/assets/25793226/55a28890-65bf-482a-a14c-8b9561532717" width="400px" />
  <img src="https://github.com/yurucam/exif-frame/assets/25793226/b8b60b55-665b-42b2-b9c6-d39109fd0777" width="400px" />
<p/>

[EXIF Frame](https://exif-frame.yuru.cam) is a web application that displays exif metadata in the frame by adding a white border frame to the image. Users can process the uploaded image and download the result. You can also manually edit the automatically acquired and displayed exif metadata later.

## 🚀 Available Platforms

- **🌐 Web App**: [exif-frame.yuru.cam](https://exif-frame.yuru.cam)
- **📱 Mobile Apps**: 
  - [Google Play Store](https://play.google.com/store/apps/details?id=com.yurucam.exif)
  - [Apple App Store](https://apps.apple.com/kr/app/exif-%ED%94%84%EB%A0%88%EC%9E%84/id6494989030)
- **💻 Desktop Apps**: 
  - macOS (Intel & Apple Silicon)
  - Windows (x64 & x32)
  - Linux (AppImage, deb, rpm)

## 📦 Desktop App

The desktop version provides native file system integration and enhanced user experience.

### Download

Desktop apps are automatically built and released via GitHub Actions. Check the [Releases](https://github.com/yurucam/exif-frame/releases) page for the latest versions.

#### **🍎 macOS Installation**

If you encounter the "app is damaged and can't be opened" error:

**Method 1: Use Terminal (Recommended)**
```bash
sudo xattr -rd com.apple.quarantine "/Applications/EXIF Frame.app"
```

**Method 2: System Preferences**
1. Go to **System Preferences** > **Security & Privacy**
2. Click **General** tab
3. Click **Open Anyway** next to the blocked app message
4. Or check **"App Store and identified developers"** and click **"Open Anyway"**

**Method 3: Right-click Method**
1. Right-click on the app
2. Select **"Open"** from the context menu
3. Click **"Open"** in the warning dialog

#### **🪟 Windows Installation**

- **Installer**: `.exe` files with installation wizard
- **Portable**: `-portable.exe` files (no installation required)

#### **🐧 Linux Installation**

- **AppImage**: Universal portable executable (all distributions)
- **deb**: Debian/Ubuntu packages (`sudo dpkg -i filename.deb`)
- **rpm**: RHEL/Fedora packages (`sudo rpm -i filename.rpm`)
- **tar.gz**: Portable archive (extract and run)

### Development

See [desktop/README.md](desktop/README.md) for setup and build instructions.

## Contributors

Special thanks to all the people who have contributed to this project:

- [rhea-so](https://github.com/rhea-so)
- [longfin](https://github.com/longfin)
- [KelvinPuyam](https://github.com/KelvinPuyam)
- [SJC08](https://github.com/SJC08)
