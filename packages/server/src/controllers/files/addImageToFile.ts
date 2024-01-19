import type { ImageFile, ImageNoodle } from '@noodlestan/shared-types';

import { getNoodleById, updateNoodle } from '../../noodles';

export const addImageToFile = async (id: string, image: ImageFile): Promise<void> => {
    const noodle = getNoodleById<ImageNoodle>(id);

    noodle.images = noodle.images || [];
    noodle.images.push(image);
    noodle.dateUpdated = new Date();

    await updateNoodle(noodle);
};
