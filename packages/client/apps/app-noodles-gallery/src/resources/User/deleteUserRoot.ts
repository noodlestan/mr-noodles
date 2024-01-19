import type { APIResponse, UserNoodle, UserRoot } from '@noodlestan/shared-types';

import { API_ENDPOINTS } from '../endpoints';

import { apiDelete } from '@/api/apiDelete';

export const deleteUserRoot = async (
    user: UserNoodle,
    root: UserRoot,
): Promise<APIResponse<UserNoodle>> => {
    const { data, meta } = await apiDelete<UserNoodle>(
        API_ENDPOINTS.userRoot(user.id, root.id),
        undefined,
    );

    return { data, meta };
};
