export const PHOTO_PROCESS_ERROR = 'photo:process:error';

export type PhotoProcessError = {
    filename: string;
    error: Error;
};
