import { createMediaFile } from '../MediaFiles';
import { Root } from '../types';

import { importImageData } from './importImageData';
import { ImageNoodle } from './types';

export const createImage = (data: Partial<ImageNoodle>, root: Root): ImageNoodle => {
    const file = createMediaFile(data, root);

    const image = importImageData(data);

    return {
        ...file,
        ...image,
        mediaType: 'image',
    };
};
