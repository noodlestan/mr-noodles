import { Types, isValidObjectId } from 'mongoose';

import type { PhotoDocument } from '../../models/photo';
import { Photo } from '../../models/photo';

export const findPhotoById = async (
    id: string | Types.ObjectId,
): Promise<PhotoDocument | undefined> => {
    const photo = isValidObjectId(id) && (await Photo.findById(id));
    return photo || undefined;
};
