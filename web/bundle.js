import { readFileSync, writeFileSync } from 'fs';
import { execSync } from 'child_process';
import { v4 as uuidv4 } from 'uuid';
import { platform } from 'os';

const packageJson = readFileSync('package.json', 'utf8');
const version = JSON.parse(packageJson).version;

const bundleId = uuidv4();

// Use platform-specific zip command
const isWindows = platform() === 'win32';
const zipCommand = isWindows 
  ? `cd dist && powershell Compress-Archive -Path .\\* -DestinationPath .\\${bundleId}.zip`
  : `cd dist && zip -r ./${bundleId}.zip ./*`;

execSync(zipCommand);

writeFileSync(
  'dist/version.json',
  JSON.stringify({
    version,
    url: `https://exif-frame.yuru.cam/${bundleId}.zip`,
  })
);
