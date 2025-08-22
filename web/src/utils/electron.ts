// Electron 환경 감지 및 API 타입 정의
declare global {
  interface Window {
    electronAPI?: {
      onMenuNew: (callback: () => void) => void;
      onMenuOpenFiles: (callback: (event: any, filePaths: string[]) => void) => void;
      onMenuSave: (callback: () => void) => void;
      removeAllListeners: (channel: string) => void;
      platform: string;
      isElectron: boolean;
      readFile: (filePath: string) => Promise<{
        buffer: number[];
        fileName: string;
        mimeType: string;
      }>;
    };
  }
}

export const isElectron = () => {
  return typeof window !== 'undefined' && window.electronAPI?.isElectron === true;
};

export const getPlatform = () => {
  return window.electronAPI?.platform || 'web';
};

export const readElectronFile = async (filePath: string): Promise<File> => {
  if (!isElectron()) {
    throw new Error('This function only works in Electron environment');
  }

  const { buffer, fileName, mimeType } = await window.electronAPI!.readFile(filePath);
  const uint8Array = new Uint8Array(buffer);
  return new File([uint8Array], fileName, { type: mimeType });
};

export const setupElectronMenuListeners = (callbacks: {
  onNew?: () => void;
  onOpenFiles?: (filePaths: string[]) => void;
  onSave?: () => void;
}) => {
  if (!isElectron()) return;

  const { electronAPI } = window;
  
  if (callbacks.onNew) {
    electronAPI!.onMenuNew(callbacks.onNew);
  }
  
  if (callbacks.onOpenFiles) {
    electronAPI!.onMenuOpenFiles((_event: any, filePaths: string[]) => {
      callbacks.onOpenFiles!(filePaths);
    });
  }
  
  if (callbacks.onSave) {
    electronAPI!.onMenuSave(callbacks.onSave);
  }
};

export const removeElectronMenuListeners = () => {
  if (!isElectron()) return;
  
  const { electronAPI } = window;
  electronAPI!.removeAllListeners('menu-new');
  electronAPI!.removeAllListeners('menu-open-files');
  electronAPI!.removeAllListeners('menu-save');
};

export default {
  isElectron,
  getPlatform,
  readElectronFile,
  setupElectronMenuListeners,
  removeElectronMenuListeners
};
