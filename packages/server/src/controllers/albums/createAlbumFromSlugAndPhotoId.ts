import { Types } from 'mongoose';

import type { AlbumDocument } from '../../models/album';
import { Album } from '../../models/album';

export const createAlbumFromSlugAndPhotoId = async (
    slug: string,
    photoId: Types.ObjectId,
): Promise<AlbumDocument> => {
    const album = Album.fromData({
        dateCreated: new Date(),
        slug,
        title: slug,
    });
    album.photos.push(photoId);

    await album.save();

    return album;
};
