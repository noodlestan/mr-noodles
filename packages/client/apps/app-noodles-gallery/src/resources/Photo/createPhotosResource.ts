import { APIResponse, PhotoModel, PhotoQuery } from '@noodlestan/shared-types';
import { Accessor, ResourceReturn, createResource } from 'solid-js';

import { fetchPhotos } from './fetchPhotos';

export const createPhotosResource = (
    query: Accessor<PhotoQuery>,
): ResourceReturn<APIResponse<PhotoModel[]>> => {
    return createResource(query, () => fetchPhotos(query()));
};
