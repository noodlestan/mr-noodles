import { importMediaFile } from '../MediaFiles/index.js';

import { importVideoData } from './importVideoData';
import { VideoNoodle } from './types.js';

export const importVideo = (data: VideoNoodle): VideoNoodle => {
    const mediaFile = importMediaFile<VideoNoodle>(data);
    const video = importVideoData(mediaFile);

    return {
        ...mediaFile,
        ...video,
    };
};
