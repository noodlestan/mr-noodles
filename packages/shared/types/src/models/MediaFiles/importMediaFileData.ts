import { importDate } from '../functions/importDate.js';

import { MediaFileNoodle } from './types.js';

export const importMediaFileData = (data: Partial<MediaFileNoodle>): Partial<MediaFileNoodle> => {
    const { dateHashed, dateTaken, ...rest } = data;

    return {
        ...rest,
        dateHashed: importDate(dateHashed) || new Date(),
        dateTaken: importDate(dateTaken),
    };
};
