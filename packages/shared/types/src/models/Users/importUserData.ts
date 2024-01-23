import { importDate } from '../functions/importDate.js';

import { UserNoodle } from './types.js';

export const importUserData = (data: Partial<UserNoodle>): Partial<UserNoodle> => {
    const { citizen, dateCitizen, ...rest } = data;

    return {
        citizen: !!citizen,
        dateCitizen: importDate(dateCitizen),
        ...rest,
    } as UserNoodle;
};
