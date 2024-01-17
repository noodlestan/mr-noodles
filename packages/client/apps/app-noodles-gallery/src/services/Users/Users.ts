import type { UserModel } from '@noodlestan/shared-types';
import { Accessor } from 'solid-js';

import { createUsersResource } from '@/resources/User/createUsersResource';

type PhotosService = {
    loading: Accessor<boolean>;
    users: Accessor<UserModel[]>;
};

export const createUsersService = (): PhotosService => {
    const [resource] = createUsersResource();

    const loading = () => resource.loading;
    const users = () => resource()?.data || [];

    return {
        loading,
        users,
    };
};
