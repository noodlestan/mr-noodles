import path from 'path';

import { PUBLIC_ASSETS_BASE_URL } from '../../env';

export const makeThumbPublicUrl = (filename: string): string => {
    return path.join(PUBLIC_ASSETS_BASE_URL, filename);
};
