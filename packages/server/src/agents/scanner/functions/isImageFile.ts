import path from 'path';

import { SCAN_EXTENSIONS } from '../../../env';

export const isImageFile = (filename: string): boolean => {
    const parts = path.parse(filename);
    return SCAN_EXTENSIONS.includes(parts.ext.toLowerCase());
};
