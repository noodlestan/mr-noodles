import { ImageProfile } from './types';

export const selectProfileByName = (profiles: ImageProfile[], name: string): ImageProfile => {
    const sorted = profiles?.sort((a, b) => a.height - b.height) || [];
    const fallback = sorted[0];
    return profiles.find(item => item.name === name) || fallback;
};
