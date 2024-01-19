import { importDate } from '../functions/importDate';

import { UserNoodle } from './types';

export const importUserData = (data: Partial<UserNoodle>): Partial<UserNoodle> => {
    const { citizen, dateCitizen, ...rest } = data;

    return {
        citizen: !!citizen,
        dateCitizen: importDate(dateCitizen),
        ...rest,
    } as UserNoodle;
};
