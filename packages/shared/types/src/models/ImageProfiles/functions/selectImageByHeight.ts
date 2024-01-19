import { ImageFile } from '../types';

export const selectImageByHeight = (
    images: ImageFile[] | undefined,
    height: number,
): ImageFile | undefined => {
    const sorted = images?.sort((a, b) => a.h - b.h) || [];
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    const fallback = height > 0 ? last : first;
    return sorted?.find(item => item.h >= height) || fallback;
};
