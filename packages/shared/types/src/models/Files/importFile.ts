import { importNoodle } from '../Noodles';

import { importFileData } from './importFileData';
import { FileNoodle } from './types';

export function importFile<T extends FileNoodle>(data: T): T {
    const noodle = importNoodle(data);
    const file = importFileData(data);

    return {
        ...noodle,
        ...file,
    };
}
