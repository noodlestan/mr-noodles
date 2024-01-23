import { createMediaFile } from '../MediaFiles/index.js';
import { Root } from '../types.js';

import { importImageData } from './importImageData.js';
import { ImageNoodle } from './types.js';

export const createImage = (
    data: Partial<ImageNoodle>,
    root: Root,
    absoluteFilename?: string,
): ImageNoodle => {
    const file = createMediaFile(data, root, absoluteFilename);

    const image = importImageData(data);

    return {
        ...file,
        ...image,
        mediaType: 'image',
    };
};
