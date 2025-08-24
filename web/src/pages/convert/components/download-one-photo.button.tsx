import { useStore } from '../../../store';
import { Button, Icon } from 'konsta/react';
import Photo from '../../../core/photo';
import { IoDownloadOutline } from 'react-icons/io5';
import themes from '../../../themes';
import render from '../../../core/drawing/render';
import convert from '../../../core/drawing/convert';
import free from '../../../core/drawing/free';
import download from '../../../core/file-system/download';
import { ThemeOptionInput, getConverter } from '../../theme/types/theme-option';
import Customize from '../../theme/database/customize';
// import { ExifRestorer } from 'exif-restorer'; // Temporarily disabled

interface DownloadOnePhotoButtonProps {
  photo: Photo;
}

const DownloadOnePhotoButton: React.FC<DownloadOnePhotoButtonProps> = ({ photo }) => {
  const store = useStore();
  const { selectedThemeName, exportToJpeg, maintainExif, quality, setLoading } = store;

  const input: ThemeOptionInput = new Map<string, string | number | boolean>();
  const theme = themes.find((theme) => theme.name === selectedThemeName);
  theme?.options.forEach((option) => {
    const value = Customize.get(selectedThemeName, option.id, getConverter(option.type));
    if (value !== null) {
      input.set(option.id, value);
    } else {
      input.set(option.id, option.default);
    }
  });

  const func = theme?.func;

  return (
    <div className="w-10">
      <Button
        onClick={async () => {
          setLoading(true);
          await new Promise((resolve) => setTimeout(resolve, 100));

          const canvas = await render(func!, photo, input, store);
          const filename = photo.file.name.replace(/\.[^/.]+$/, `.${exportToJpeg ? 'jpg' : 'webp'}`);
          const data = await convert(canvas, { type: exportToJpeg ? 'image/jpeg' : 'image/webp', quality });
          free(canvas);

          if (exportToJpeg && maintainExif) {
            // await download(filename, ExifRestorer.restore(photo.imageBase64, data));
            await download(filename, data); // Temporarily disabled EXIF restoration
          } else {
            await download(filename, data); // TODO: Add Exif data to the webp file
          }

          setLoading(false);
        }}
      >
        <Icon ios={<IoDownloadOutline className="w-5 h-5" />} />
      </Button>
    </div>
  );
};

export default DownloadOnePhotoButton;
