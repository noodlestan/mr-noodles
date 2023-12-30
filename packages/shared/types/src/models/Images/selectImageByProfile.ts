import { ImageFile, ImageProfile } from './types';

export const selectImageByProfile = (
    images: ImageFile[] | undefined,
    profile: ImageProfile,
): ImageFile | undefined => {
    return images?.find(item => item.p === profile.name);
};
