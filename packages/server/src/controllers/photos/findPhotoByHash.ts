import { PhotoModel } from '@noodlestan/shared-types';

import { findNoodle } from '../../db';

export const findPhotoByHash = (hash: string): PhotoModel | undefined => {
    return findNoodle<PhotoModel>(n => n.type === 'photo' && n.hash === hash);
};
