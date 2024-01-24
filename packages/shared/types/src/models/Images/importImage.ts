import { importMediaFile } from '../MediaFiles/index.js';

import { importImageData } from './importImageData';
import { ImageNoodle } from './types.js';

export const importImage = (data: ImageNoodle): ImageNoodle => {
    const mediaFile = importMediaFile<ImageNoodle>(data);
    const image = importImageData(mediaFile);

    return {
        ...mediaFile,
        ...image,
    };
};
