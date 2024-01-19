import { importNoodle } from '../Noodles';

import { importUserData } from './importUserData';
import { UserNoodle } from './types';

export const importUser = (data: UserNoodle): UserNoodle => {
    const noodle = importNoodle<UserNoodle>(data);
    const user = importUserData(data);

    return {
        ...noodle,
        ...user,
    };
};
