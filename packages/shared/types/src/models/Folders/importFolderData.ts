import { importDate } from '../functions/importDate.js';

import { FolderNoodle } from './types.js';

export const importFolderData = (data: Partial<FolderNoodle>): Partial<FolderNoodle> => {
    const { dateFrom, dateUntil, ...rest } = data;

    return {
        ...rest,
        dateFrom: importDate(dateFrom),
        dateUntil: importDate(dateUntil),
    } as FolderNoodle;
};
