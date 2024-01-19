import type { FolderNoodle, ImageFile } from '@noodlestan/shared-types';

import { getNoodleById, updateNoodle } from '../../noodles';

export const addImageToFolder = async (id: string, image: ImageFile): Promise<void> => {
    const noodle = getNoodleById<FolderNoodle>(id);

    noodle.images = noodle.images || [];
    noodle.images.push(image);
    noodle.dateUpdated = new Date();

    await updateNoodle(noodle);
};
