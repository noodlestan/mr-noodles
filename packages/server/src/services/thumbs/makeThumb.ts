import { mkdir } from 'fs/promises';
import path from 'path';

import { Thumb } from '@noodlestan/shared-types';
import sharp from 'sharp';

import { PUBLIC_ASSETS_DIR } from '../../env';

import { makeFilenameFromIdAndHeight } from './utils/makeFilenameFromIdAndHeight';

export const makeThumb = async (filename: string, id: string, height: number): Promise<Thumb> => {
    const target = makeFilenameFromIdAndHeight(id, height);
    const file = await sharp(filename);
    file.resize(undefined, height, { fit: 'cover' });

    const destination = path.join(PUBLIC_ASSETS_DIR, target);
    const dir = path.dirname(destination);
    await mkdir(dir, { recursive: true });
    await file.toFile(destination);

    return { h: height, f: target };
};
