import path from 'path';

import { IMAGE_EXTENSIONS } from '../../../env';

export const isImageFile = (filename: string): boolean => {
    const parts = path.parse(filename);
    return IMAGE_EXTENSIONS.includes(parts.ext.toLowerCase());
};
