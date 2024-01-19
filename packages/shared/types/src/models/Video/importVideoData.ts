import { VideoNoodle } from './types';

export const importVideoData = (partial: Partial<VideoNoodle>): VideoNoodle =>
    partial as VideoNoodle;
