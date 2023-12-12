import { readFile } from 'fs/promises';
import path from 'path';

import { PUBLIC_ASSETS_DIR } from '../../env';

export const readThumb = async (relativeFilename: string): Promise<Buffer> => {
    const filename = path.join(PUBLIC_ASSETS_DIR, relativeFilename);
    return readFile(filename);
};
