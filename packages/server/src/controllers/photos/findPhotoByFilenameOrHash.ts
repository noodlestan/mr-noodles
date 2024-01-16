import { PhotoModel } from '@noodlestan/shared-types';

import { findNoodle } from '../../db';

export const findPhotoByFilenameOrHash = (
    filename: string,
    hash: string,
): PhotoModel | undefined => {
    const byFilename = findNoodle<PhotoModel>(n => n.type === 'photo' && n.filename === filename);
    if (byFilename) {
        return byFilename;
    } else {
        return findNoodle<PhotoModel>(n => n.type === 'photo' && n.hash === hash);
    }
};
