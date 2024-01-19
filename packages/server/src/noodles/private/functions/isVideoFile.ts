import path from 'path';

import { VIDEO_EXTENSIONS } from '../../../env';

export const isVideoFile = (filename: string): boolean => {
    const parts = path.parse(filename);
    return VIDEO_EXTENSIONS.includes(parts.ext.toLowerCase());
};
