import { createMediaFile } from '../MediaFiles';
import { Root } from '../types';

import { importVideoData } from './importVideoData';
import { VideoNoodle } from './types';

export const createVideo = (
    data: Partial<VideoNoodle>,
    root: Root,
    absoluteFilename?: string,
): VideoNoodle => {
    const mediaFile = createMediaFile(data, root, absoluteFilename);

    const video = importVideoData(data);

    return {
        ...mediaFile,
        ...video,
        mediaType: 'video',
    };
};
