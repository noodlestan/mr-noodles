import type { UserNoodle } from '@noodlestan/shared-types';
import { createResource } from 'solid-js';

import { APIResourceReturn } from '../types';

import { fetchUsers } from './fetchUsers';

export const createUsersResource = (): APIResourceReturn<UserNoodle[]> => {
    const [resource, { mutate, refetch }] = createResource(() => fetchUsers());

    const wrappedMutate = (mutator: (items: UserNoodle[]) => UserNoodle[] | undefined) =>
        mutate(prev => ({ data: mutator(prev?.data || []) || [], meta: prev?.meta || {} }));

    return [resource, { mutate: wrappedMutate, refetch }];
};
