import { exportNoodle } from '../Noodles';

import { FileNoodle } from './types';

export function exportFile<T extends FileNoodle>(noodle: T): T {
    return exportNoodle<T>(noodle);
}
