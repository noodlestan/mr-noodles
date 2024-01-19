import type { APIResponse, FolderNoodle } from '@noodlestan/shared-types';
import { importFolder } from '@noodlestan/shared-types';

import { apiGet } from '../../api/apiGet';
import { API_ENDPOINTS } from '../endpoints';

export const fetchFolders = async (): Promise<APIResponse<FolderNoodle[]>> => {
    const params = {
        pageSize: 5000,
    };
    const { data, meta } = await apiGet<{ results: FolderNoodle[] }>(
        API_ENDPOINTS.folders(),
        params,
    );

    return { data: data.results.map(importFolder), meta };
};
