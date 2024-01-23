import { importMediaFile } from '../MediaFiles/index.js';

import { importVideoData } from './importVideoData';
import { VideoNoodle } from './types.js';

export const importVideo = (data: VideoNoodle): VideoNoodle => {
    const file = importMediaFile<VideoNoodle>(data);
    const video = importVideoData(data);

    return {
        ...file,
        ...video,
    };
};
