import {
    type APIResponse,
    type FileNoodle,
    type FileQuery,
    type QueryParams,
    mappers,
} from '@noodlestan/shared-types';

import { apiGet } from '../../api/apiGet';
import { API_ENDPOINTS } from '../endpoints';

export const fetchFiles = async (query: FileQuery): Promise<APIResponse<FileNoodle[]>> => {
    const { sortBy, filterBy } = query;
    const params: QueryParams = {
        pageSize: 200,
        sortBy: sortBy && JSON.stringify(sortBy),
        filterBy: filterBy && JSON.stringify(filterBy),
    };
    const { data, meta } = await apiGet<{ results: FileNoodle[] }>(API_ENDPOINTS.files(), params);

    return {
        data: data.results.map((item: FileNoodle) => {
            const mapper = mappers.find(({ match }) => match(item));
            return mapper?.import(item) as FileNoodle;
        }),
        meta,
    };
};
