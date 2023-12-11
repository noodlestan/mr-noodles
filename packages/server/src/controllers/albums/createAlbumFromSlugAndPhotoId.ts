import { ObjectId } from 'mongoose';

import { Album, AlbumDocument } from '../../models/album';

export const createAlbumFromSlugAndPhotoId = async (
    slug: string,
    photoId: ObjectId,
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
