import { importDate } from '../functions/importDate';

import { BaseNoodle } from './types';

export const importNoodleData = (data: Partial<BaseNoodle>): Partial<BaseNoodle> => {
    const { dateCreated, dateUpdated, ...rest } = data;

    return {
        dateCreated: importDate(dateCreated),
        dateUpdated: importDate(dateUpdated),
        ...rest,
    } as BaseNoodle;
};
