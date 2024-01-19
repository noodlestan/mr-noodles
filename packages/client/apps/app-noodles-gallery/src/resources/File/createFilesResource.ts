import type { APIResponse, FileNoodle, FileQuery } from '@noodlestan/shared-types';
import { Accessor, ResourceReturn, createResource } from 'solid-js';

import { fetchFiles } from './fetchFiles';

export const createFilesResource = (
    query: Accessor<FileQuery>,
): ResourceReturn<APIResponse<FileNoodle[]>> => {
    return createResource(query, () => fetchFiles(query()));
};
