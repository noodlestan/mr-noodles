import type { FolderNoodle } from '@noodlestan/shared-types';
import { createResource } from 'solid-js';

import { APIResourceReturn } from '../types';

import { fetchFolders } from './fetchFolders';

export const createFoldersResource = (): APIResourceReturn<FolderNoodle[]> => {
    const [resource, { mutate, refetch }] = createResource(() => fetchFolders());

    const wrappedMutate = (mutator: (items: FolderNoodle[]) => FolderNoodle[] | undefined) =>
        mutate(prev => ({ data: mutator(prev?.data || []) || [], meta: prev?.meta || {} }));

    return [resource, { mutate: wrappedMutate, refetch }];
};
