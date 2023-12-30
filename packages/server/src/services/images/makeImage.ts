import { mkdir } from 'fs/promises';
import path from 'path';

import { ImageFile, ImageProfile } from '@noodlestan/shared-types';
import sharp from 'sharp';

import { PUBLIC_ASSETS_DIR } from '../../env';

import { makeImageFilename } from './utils/makeFilenameFromIdAndHeight';

export const makeImage = async (
    filename: string,
    id: string,
    profile: ImageProfile,
): Promise<ImageFile> => {
    const { name, width, height, fit } = profile;
    if (!width && !height) {
        throw new Error(`Invalid profile "${name}": at least one of [width, height] is required`);
    }
    const target = makeImageFilename(id, name);
    const file = await sharp(filename);
    const meta = await file.metadata();
    const ratio = (meta.height || 1) / (meta.width || 1);
    file.resize(width, height, { fit });

    const destination = path.join(PUBLIC_ASSETS_DIR, target);
    const dir = path.dirname(destination);
    await mkdir(dir, { recursive: true });
    await file.toFile(destination);

    const w = width || Math.ceil((height || 1) / ratio);
    const h = height || Math.ceil((width || 1) * ratio);
    return { p: name, w, h, f: target };
};
