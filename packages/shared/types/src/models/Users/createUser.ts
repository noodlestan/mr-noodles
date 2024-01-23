import { createNoodle } from '../Noodles';
import { Root } from '../types';

import { importUserData } from './importUserData';
import { UserNoodle } from './types';

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
