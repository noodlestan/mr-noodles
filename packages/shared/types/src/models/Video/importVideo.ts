import { importMediaFile } from '../MediaFiles';

import { importVideoData } from './importVideoData';
import { VideoNoodle } from './types';

export const importVideo = (data: VideoNoodle): VideoNoodle => {
    const file = importMediaFile<VideoNoodle>(data);
    const video = importVideoData(data);

    return {
        ...file,
        ...video,
    };
};
