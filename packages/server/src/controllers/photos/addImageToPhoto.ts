import { ImageFile, PhotoModel } from '@noodlestan/shared-types';

import { getNoodleById, updateNoodle } from '../../db';

export const addImageToPhoto = async (id: string, image: ImageFile): Promise<void> => {
    const noodle = getNoodleById<PhotoModel>(id);

    noodle.images = noodle.images || [];
    noodle.images.push(image);
    noodle.dateUpdated = new Date();

    await updateNoodle(noodle);
};
