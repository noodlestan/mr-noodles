import { importNoodle } from '../Noodles/index.js';

import { importFileData } from './importFileData';
import { FileNoodle } from './types.js';

export function importFile<T extends FileNoodle>(data: T): T {
    const noodle = importNoodle<T>(data);
    const file = importFileData(noodle);

    return {
        ...noodle,
        ...file,
    };
}
