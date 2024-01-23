import { importMediaFile } from '../MediaFiles/index.js';

import { importImageData } from './importImageData';
import { ImageNoodle } from './types.js';

export const importImage = (data: ImageNoodle): ImageNoodle => {
    const file = importMediaFile<ImageNoodle>(data);
    const image = importImageData(data);

    return {
        ...file,
        ...image,
    };
};
