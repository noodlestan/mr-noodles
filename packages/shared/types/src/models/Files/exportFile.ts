import { exportNoodle } from '../Noodles/index.js';

import { FileNoodle } from './types.js';

export function exportFile<T extends FileNoodle>(noodle: T): T {
    return exportNoodle<T>(noodle);
}
