import { ImageProfile } from '../types';

export const selectProfileByHeight = (
    profiles: ImageProfile[] | undefined,
    height: number,
): ImageProfile => {
    const sorted = profiles?.sort((a, b) => a.height - b.height) || [];
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    const fallback = height > 0 ? last : first;
    return sorted?.find(item => item.height >= height) || fallback;
};
