import type { APIResponse, UserNoodle, UserRoot } from '@noodlestan/shared-types';

import { API_ENDPOINTS } from '../endpoints';

import { apiPut } from '@/api/apiPut';

export const updateUserRoot = async (
    user: UserNoodle,
    root: UserRoot,
): Promise<APIResponse<UserNoodle>> => {
    const payload = {
        root,
    };
    const { data, meta } = await apiPut<UserNoodle>(
        API_ENDPOINTS.userRoot(user.id, root.id),
        undefined,
        payload,
    );

    return { data, meta };
};
