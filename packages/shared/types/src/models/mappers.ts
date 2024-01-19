import { VideoNoodle, createVideo, exportVideo, importVideo } from './Video';
import { createMapper } from './functions/createMapper';

import {
    FolderNoodle,
    ImageNoodle,
    UserNoodle,
    createFolder,
    createImage,
    createUser,
    exportFolder,
    exportImage,
    exportUser,
    importFolder,
    importImage,
    importUser,
} from '.';

export const mapUser = createMapper<UserNoodle>(
    'user',
    noodle => noodle.type === 'user',
    createUser,
    importUser,
    exportUser,
);

export const mapFolder = createMapper<FolderNoodle>(
    'folder',
    noodle => noodle.type === 'folder',
    createFolder,
    importFolder,
    exportFolder,
);

export const mapImage = createMapper<ImageNoodle>(
    'image',
    noodle => noodle.type === 'file' && noodle.mediaType === 'image',
    createImage,
    importImage,
    exportImage,
);

export const mapVideo = createMapper<VideoNoodle>(
    'video',
    noodle => noodle.type === 'file' && noodle.mediaType === 'video',
    createVideo,
    importVideo,
    exportVideo,
);

export const mappers = [mapUser, mapFolder, mapImage, mapVideo];
