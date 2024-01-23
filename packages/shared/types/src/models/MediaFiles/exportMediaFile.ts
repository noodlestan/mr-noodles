import { exportFile } from '../Files/index.js';

import { MediaFileNoodle } from './types.js';

export function exportMediaFile<T extends MediaFileNoodle>(noodle: T): T {
    return exportFile<T>(noodle);
}
