import { ImageFile, UserModel } from '@noodlestan/shared-types';

import { getNoodleById, updateNoodle } from '../../noodles';

export const addImageToUser = async (id: string, image: ImageFile): Promise<void> => {
    const noodle = getNoodleById<UserModel>(id);

    noodle.images = noodle.images || [];
    noodle.images.push(image);
    noodle.dateUpdated = new Date();

    await updateNoodle(noodle);
};
