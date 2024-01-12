import { Types } from 'mongoose';

import { Album } from '../../models/album';

export const ensurePhotoNotInAlbum = async (
    photoId: Types.ObjectId,
    albumSlug: string,
): Promise<void> => {
    const updates = {
        $pull: { photos: photoId },
        $set: {
            dateUpdated: new Date(),
        },
    };
    await Album.updateOne({ slug: albumSlug }, updates);
};
