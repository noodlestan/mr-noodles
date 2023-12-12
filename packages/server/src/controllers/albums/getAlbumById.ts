import { Types, isValidObjectId } from 'mongoose';

import type { AlbumDocument } from '../../models/album';
import { Album } from '../../models/album';

export const getAlbumById = async (
    id: string | Types.ObjectId,
): Promise<AlbumDocument | undefined> => {
    const photo = isValidObjectId(id) && (await Album.findById(id));
    return photo || undefined;
};
