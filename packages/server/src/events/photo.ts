export const PHOTO_PROCESS_ERROR = 'photo:process:error';

export type PhotoProcessError = {
    filename: string;
    error: Error;
};

export const PHOTO_PROCESS_WARNING = 'photo:process:warning';

export type PhotoProcessWarning = {
    filename: string;
    message: string;
};
