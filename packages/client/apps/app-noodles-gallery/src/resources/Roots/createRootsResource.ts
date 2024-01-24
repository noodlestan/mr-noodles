import type { APIResponse, Root } from '@noodlestan/shared-types';
import { ResourceReturn, createResource } from 'solid-js';

import { fetchRoots } from './fetchRoots';

export const createRootsResource = (): ResourceReturn<APIResponse<Root[]>> => {
    return createResource(fetchRoots);
};
