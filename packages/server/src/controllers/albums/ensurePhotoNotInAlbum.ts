import { Types } from 'mongoose';

import { Album } from '../../models/album';

export const ensurePhotoNotInAlbum = async (
    photoId: Types.ObjectId,
    albumSlug: string,
): Promise<void> => {
    await Album.updateOne({ slug: albumSlug }, { $pull: { photos: photoId } });
};
