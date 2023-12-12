import { mkdir } from 'fs/promises';
import path from 'path';

import sharp from 'sharp';

import { PUBLIC_ASSETS_DIR } from '../../env';

import { THUMB_HEIGHT, THUMB_WIDTH } from './constants';
import { makeFilenameFromId } from './utils/makeFilenameFromId';

export const makeThumb = async (filename: string, id: string): Promise<string> => {
    const target = makeFilenameFromId(id);
    const file = await sharp(filename);
    file.resize(THUMB_WIDTH, THUMB_HEIGHT, { fit: 'cover' });

    const destination = path.join(PUBLIC_ASSETS_DIR, target);
    const dir = path.dirname(destination);
    await mkdir(dir, { recursive: true });
    await file.toFile(destination);

    return target;
};
