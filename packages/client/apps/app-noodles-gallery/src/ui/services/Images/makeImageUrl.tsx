import type { ImageFile } from '@noodlestan/shared-types';

export const selectImageByProfile = (
    images: ImageFile[] | undefined,
    profile: string,
): ImageFile | undefined => {
    return images?.find(item => item.p === profile);
};

// TODO convert to interface in shared/types
type ItemWithImages = { id: string; images?: ImageFile[] };
type ResourceType = 'albums' | 'photos';

export const makeImageUrl = (
    resourceType: ResourceType,
    item: ItemWithImages,
    profile: string,
): string => {
    const image = selectImageByProfile(item.images, profile);
    return image ? image.f : `http://localhost:8008/${resourceType}/${item.id}/img?p=${profile}`;
};
