import { importMediaFile } from '../MediaFiles';

import { importImageData } from './importImageData';
import { ImageNoodle } from './types';

export const importImage = (data: ImageNoodle): ImageNoodle => {
    const file = importMediaFile<ImageNoodle>(data);
    const image = importImageData(data);

    return {
        ...file,
        ...image,
    };
};
