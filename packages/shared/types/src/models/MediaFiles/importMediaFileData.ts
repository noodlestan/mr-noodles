import { importDate } from '../functions/importDate';

import { MediaFileNoodle } from './types';

export const importMediaFileData = (data: Partial<MediaFileNoodle>): Partial<MediaFileNoodle> => {
    const { dateHashed, dateTaken, ...rest } = data;

    return {
        dateHashed: importDate(dateHashed) || new Date(),
        dateTaken: importDate(dateTaken),
        ...rest,
    };
};
