import type { ImageFile, UserNoodle } from '@noodlestan/shared-types';

import { getNoodleById, updateNoodle } from '../../noodles';

export const addImageToUser = async (id: string, image: ImageFile): Promise<UserNoodle> => {
    const noodle = getNoodleById<UserNoodle>(id);

    const images = noodle.images || [];
    images.push(image);

    const dateUpdated = new Date();
    const updated = {
        ...noodle,
        images,
        dateUpdated,
    };
    await updateNoodle(updated);
    return updated;
};
