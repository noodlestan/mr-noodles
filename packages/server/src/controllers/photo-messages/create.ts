import type { PhotoMessageDocument, PhotoMessageLevel } from '../../models/photo-message';
import { PhotoMessage } from '../../models/photo-message';

export const createPhotoMessage = async (
    level: PhotoMessageLevel,
    message: string,
    filename: string,
): Promise<PhotoMessageDocument> => {
    const msg = PhotoMessage.fromData({
        dateCreated: new Date(),
        level,
        message,
        filename,
    });

    await msg.save();

    return msg;
};
