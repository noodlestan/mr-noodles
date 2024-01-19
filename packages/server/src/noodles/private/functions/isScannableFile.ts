import path from 'path';

import { SCAN_EXTENSIONS } from '../../../env';

export const isScannableFile = (filename: string): boolean => {
    const parts = path.parse(filename);
    return SCAN_EXTENSIONS.includes(parts.ext.toLowerCase());
};
