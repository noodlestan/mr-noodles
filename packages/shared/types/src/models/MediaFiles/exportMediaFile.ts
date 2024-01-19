import { exportFile } from '../Files';

import { MediaFileNoodle } from './types';

export function exportMediaFile<T extends MediaFileNoodle>(noodle: T): T {
    return exportFile<T>(noodle);
}
