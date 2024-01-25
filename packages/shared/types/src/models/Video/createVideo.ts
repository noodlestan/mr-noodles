import { createMediaFile } from '../MediaFiles/index.js';
import { Root } from '../types.js';

import { importVideoData } from './importVideoData';
import { VideoNoodle } from './types.js';

export const createVideo = (
    data: Partial<VideoNoodle>,
    root: Root,
    absoluteFilename?: string,
): VideoNoodle => {
    const mediaFile = createMediaFile(data, root, absoluteFilename);

    const video = importVideoData(mediaFile);

    return {
        ...mediaFile,
        ...video,
        mediaType: 'video',
    };
};
