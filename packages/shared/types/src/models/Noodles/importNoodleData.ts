import { importDate } from '../functions/importDate.js';

import { BaseNoodle } from './types.js';

export const importNoodleData = (data: Partial<BaseNoodle>): Partial<BaseNoodle> => {
    const { dateCreated, dateUpdated, ...rest } = data;

    return {
        ...rest,
        dateCreated: importDate(dateCreated),
        dateUpdated: importDate(dateUpdated),
    } as BaseNoodle;
};
