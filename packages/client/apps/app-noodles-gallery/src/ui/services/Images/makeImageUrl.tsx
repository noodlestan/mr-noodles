import type { ImageFile, PhotoData } from '@noodlestan/shared-types';

const selectImageByHeight = (
    imageFiles: ImageFile[] | undefined,
    height: number,
): ImageFile | undefined => {
    const sorted = imageFiles?.sort((a, b) => a.h - b.h) || [];
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    const fallback = height > 0 ? last : first;
    return sorted?.find(item => item.h >= height) || fallback;
};

export const makeImageUrl = (item: PhotoData, height: number = 200): string => {
    const image = selectImageByHeight(item.images, height);
    return image ? image.f : `http://localhost:8008/photos/${item.id}/img?h=${height}`;
};
