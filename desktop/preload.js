const { contextBridge, ipcRenderer } = require('electron');
const fs = require('fs');
const path = require('path');

// Electron API를 웹 컨텍스트에 안전하게 노출
contextBridge.exposeInMainWorld('electronAPI', {
  // 메뉴 이벤트 리스너
  onMenuNew: (callback) => ipcRenderer.on('menu-new', callback),
  onMenuOpenFiles: (callback) => ipcRenderer.on('menu-open-files', callback),
  onMenuSave: (callback) => ipcRenderer.on('menu-save', callback),
  
  // 리스너 제거
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel),
  
  // 플랫폼 정보
  platform: process.platform,
  
  // 파일 시스템 관련
  isElectron: true,
  
  // 파일 읽기 (안전한 방식)
  readFile: async (filePath) => {
    try {
      const buffer = fs.readFileSync(filePath);
      const fileName = path.basename(filePath);
      const mimeType = getMimeType(filePath);
      
      return {
        buffer: Array.from(buffer),
        fileName,
        mimeType
      };
    } catch (error) {
      throw new Error(`Failed to read file: ${error.message}`);
    }
  }
});

// MIME 타입 감지 함수
function getMimeType(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const mimeTypes = {
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.png': 'image/png',
    '.gif': 'image/gif',
    '.bmp': 'image/bmp',
    '.webp': 'image/webp',
    '.tiff': 'image/tiff',
    '.tif': 'image/tiff'
  };
  return mimeTypes[ext] || 'application/octet-stream';
}

// 개발 환경에서만 콘솔 로그 활성화
if (process.env.ELECTRON_IS_DEV === 'true') {
  window.addEventListener('DOMContentLoaded', () => {
    console.log('EXIF Frame Desktop App - Development Mode');
  });
}
