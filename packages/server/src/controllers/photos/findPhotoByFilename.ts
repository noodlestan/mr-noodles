import { PhotoModel } from '@noodlestan/shared-types';

import { findNoodle } from '../../noodles';

export const findPhotoByFilename = (filename: string): PhotoModel | undefined => {
    return findNoodle<PhotoModel>(n => n.type === 'photo' && n.filename === filename);
};
