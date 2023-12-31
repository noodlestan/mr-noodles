import { Types } from 'mongoose';

import { Album } from '../../models/album';

export const ensurePhotoInAlbum = async (
    photoId: Types.ObjectId,
    albumSlug: string,
): Promise<void> => {
    await Album.updateOne({ slug: albumSlug }, { $addToSet: { photos: photoId } });
};
