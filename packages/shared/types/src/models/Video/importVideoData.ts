import { VideoNoodle } from './types.js';

export const importVideoData = (partial: Partial<VideoNoodle>): VideoNoodle =>
    partial as VideoNoodle;
