import { stat } from 'fs/promises';
import path from 'path';

import { PUBLIC_ASSETS_DIR } from '../../env';

export const imageFileExists = async (relativeFilename: string): Promise<boolean> => {
    const filename = path.join(PUBLIC_ASSETS_DIR, relativeFilename);
    try {
        await stat(filename);
        return true;
    } catch (err) {
        return false;
    }
};
