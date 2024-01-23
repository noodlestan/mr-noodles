import { createNoodle } from '../Noodles/index.js';
import { Root } from '../types.js';

import { importUserData } from './importUserData.js';
import { UserNoodle } from './types.js';

export const createUser = (data: Partial<UserNoodle>, root: Root): UserNoodle => {
    const filename = `/users/${data.name}`;
    const noodle = createNoodle({ ...data, filename }, root);

    const { type, name, ...user } = importUserData(data);
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
