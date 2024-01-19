import { createNoodle } from '../Noodles';
import { Root } from '../types';

import { importUserData } from './importUserData';
import { UserNoodle } from './types';

export const createUser = (partial: Partial<UserNoodle>, root: Root): UserNoodle => {
    const noodle = createNoodle(partial, root);

    const { type, name, ...user } = importUserData(partial);

    if (type && type !== 'user') {
        throw new Error('Invalid type');
    }

    if (!name) {
        throw new Error('Invalid name');
    }

    return {
        ...noodle,
        ...user,
        type: 'user',
        name,
    };
};
