import type { APIResponse, UserNoodle, UserRoot } from '@noodlestan/shared-types';

import { API_ENDPOINTS } from '../endpoints';

import { apiPost } from '@/api/apiPost';

export const addRootToUser = async (
    user: UserNoodle,
    root: UserRoot,
): Promise<APIResponse<UserNoodle>> => {
    const payload = {
        root,
    };
    const { data, meta } = await apiPost<UserNoodle>(
        API_ENDPOINTS.userRoots(user.id),
        undefined,
        payload,
    );

    return { data, meta };
};
