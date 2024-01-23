import type { ImageFile } from '@noodlestan/shared-types';

import { ASSETS_BASE_URL } from '@/env';
import { API_ENDPOINTS } from '@/resources/endpoints';

export const selectImageByProfile = (
    images: ImageFile[] | undefined,
    profile: string,
): ImageFile | undefined => {
    return images?.find(item => item.p === profile);
};

// TODO convert to interface in shared/types
type ItemWithImages = { id: string; images?: ImageFile[] };
type ResourceTypeWithImages = 'folder' | 'file' | 'user';

export const makeImageUrl = (
    resourceType: ResourceTypeWithImages,
    item: ItemWithImages,
    profile: string,
): string => {
    const image = selectImageByProfile(item.images, profile);
    if (image) {
        return ASSETS_BASE_URL + '/' + image.f;
    }
    const endpoint = `${resourceType}Image` as 'fileImage' | 'folderImage' | 'userImage';
    return API_ENDPOINTS[endpoint](item.id, profile);
};
