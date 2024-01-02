import { Types } from 'mongoose';

import type { AlbumDocument } from '../../models/album';
import { Album } from '../../models/album';

export const createAlbumFromSlugTitleAndPhotoId = async (
    slug: string,
    title: string,
    photoId: Types.ObjectId,
): Promise<AlbumDocument> => {
    const album = Album.fromData({
        dateCreated: new Date(),
        slug,
        title,
    });
    album.photos.push(photoId.toString());

    await album.save();

    return album;
};
