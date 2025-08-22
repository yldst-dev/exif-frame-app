import { BlockTitle, List, ListItem, Navbar, Page, Tabbar, TabbarLink, Toolbar } from 'konsta/react';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import AddPhotoButton from './components/add-photo.button';
import { useStore } from '../../store';
import DownloadOnePhotoButton from './components/download-one-photo.button';
import RemoveOnePhotoButton from './components/remove-one-photo.button';
import DownloadAllPhotoButton from './components/download-all-photo.button';
import Loading from './components/loading';
import OverrideMetadataPopup from './components/override-metadata.popup';
import OverrideMetadataButton from './components/override-metadata.button';
import RemoveAllPhotoButton from './components/remove-all-photo.button';
import SettingsIcon from '../../icons/settings.icon';
import ImageIcon from '../../icons/image.icon';
import GenerateIcon from '../../icons/generate.icon';
import AddPhotoErrorDialog from './components/add-photo-error.dialog';
import AddPhotoDragInDrop from './components/add-photo.drag-in-drop';
import { setupElectronMenuListeners, removeElectronMenuListeners, readElectronFile } from '../../utils/electron';

const FramePage = () => {
  const { t } = useTranslation();
  const { focalLength35mmMode, photos, setTabIndex, addPhotos } = useStore();

  // Electron 메뉴 이벤트 설정
  useEffect(() => {
    setupElectronMenuListeners({
      onNew: () => {
        // 새 프로젝트 시작 (모든 사진 제거)
        const { removeAllPhotos } = useStore.getState();
        removeAllPhotos();
      },
      onOpenFiles: async (filePaths: string[]) => {
        // Electron에서 파일 경로로 파일 열기
        try {
          const files: File[] = [];
          for (const filePath of filePaths) {
            const file = await readElectronFile(filePath);
            files.push(file);
          }
          addPhotos(files);
        } catch (error) {
          console.error('Failed to open files from Electron menu:', error);
        }
      },
      onSave: () => {
        // 저장 기능 (다운로드 올 버튼 클릭과 동일)
        const downloadAllButton = document.querySelector('[data-download-all]') as HTMLButtonElement;
        if (downloadAllButton) {
          downloadAllButton.click();
        }
      }
    });

    return () => {
      removeElectronMenuListeners();
    };
  }, [addPhotos]);

  return (
    <Page style={{ paddingBottom: '10rem' }}>
      <Navbar large transparent title={t('root.convert')} />

      <Toolbar className="bottom-12 fixed">
        <AddPhotoButton />
        <DownloadAllPhotoButton />
      </Toolbar>

      <AddPhotoDragInDrop />

      {photos.length !== 0 && (
        <BlockTitle>
          {t('root.loaded-photos')}
          <RemoveAllPhotoButton />
        </BlockTitle>
      )}

      <List id="list" strongIos inset>
        {photos.map((photo, index) => (
          <ListItem
            key={index}
            media={<img src={photo.thumbnail} alt={photo.file.name} style={{ width: '8rem', height: '6rem', objectFit: 'cover', borderRadius: '0.5rem' }} />}
            title={photo.file.name}
            subtitle={`${focalLength35mmMode ? photo.metadata.focalLengthIn35mm : photo.metadata.focalLength} ${photo.metadata.fNumber} ${photo.metadata.iso} ${photo.metadata.exposureTime}`}
            text={`${photo.metadata.make} ${photo.metadata.model} ${photo.metadata.lensModel}`}
            footer={
              <div className="flex space-x-1 mt-1">
                <OverrideMetadataButton photo={photo} />
                <DownloadOnePhotoButton photo={photo} />
                <RemoveOnePhotoButton index={index} />
              </div>
            }
          />
        ))}
      </List>

      <Tabbar labels={true} icons={true} className="left-0 bottom-0 fixed">
        <TabbarLink key={1} active={true} label={t('root.tab.convert')} icon={<GenerateIcon size={24} />} onClick={() => setTabIndex(0)} />
        <TabbarLink key={2} active={false} label={t('root.tab.theme-settings')} icon={<ImageIcon size={24} />} onClick={() => setTabIndex(1)} />
        <TabbarLink key={3} active={false} label={t('root.tab.export-settings')} icon={<SettingsIcon size={24} />} onClick={() => setTabIndex(2)} />
      </Tabbar>

      <OverrideMetadataPopup />

      <Loading />

      <AddPhotoErrorDialog />
    </Page>
  );
};

export default FramePage;
