import type { Root } from '@noodlestan/shared-types';
import { Accessor } from 'solid-js';

import { createRootsResource } from '@/resources/Roots/createRootsResource';

type RootsService = {
    loading: Accessor<boolean>;
    roots: Accessor<Root[]>;
    error: Accessor<string>;
    getRootById: (id: string) => Root | undefined;
    // useAddUserRoot: () => Op<[UserNoodle, UserRoot], UserNoodle>;
    // useUpdateUserRoot: () => Op<[UserNoodle, UserRoot], UserNoodle>;
    // useDeleteUserRoot: () => Op<[UserNoodle, UserRoot], UserNoodle>;
};

export const createRootsService = (): RootsService => {
    const [resource /* { mutate } */] = createRootsResource();

    const loading = () => resource.loading;
    const roots = () => resource()?.data || [];
    const error = () => resource.error;

    return {
        loading,
        roots,
        error,
        getRootById: (id: string) => roots().find(r => r.id === id),
    };
};
