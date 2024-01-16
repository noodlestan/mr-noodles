import { APIResponse, UserModel } from '@noodlestan/shared-types';
import { ResourceReturn, createResource } from 'solid-js';

import { fetchUsers } from './fetchUsers';

export const createUsersResource = (): ResourceReturn<APIResponse<UserModel[]>> => {
    return createResource(() => fetchUsers());
};
