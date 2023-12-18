import { Thumb } from './types';

export const selectThumbByHeight = (
    thumbs: Thumb[] | undefined,
    height: number,
): Thumb | undefined => {
    const first = thumbs && thumbs[0];
    const last = thumbs && thumbs[thumbs.length - 1];
    const fallbackThumb = height > 0 ? last : first;
    return thumbs?.find(item => item.h >= height) || fallbackThumb;
};
