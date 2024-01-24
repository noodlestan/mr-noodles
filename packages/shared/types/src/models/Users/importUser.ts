import { importNoodle } from '../Noodles/index.js';

import { importUserData } from './importUserData.js';
import { UserNoodle } from './types.js';

export const importUser = (data: UserNoodle): UserNoodle => {
    const noodle = importNoodle<UserNoodle>(data);
    const user = importUserData(noodle);

    return {
        ...noodle,
        ...user,
    };
};
