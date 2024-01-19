export const FILE_PROCESS_ERROR = 'file:process:error';

export type FileProcessError = {
    filename: string;
    error: Error;
};

export const FILE_PROCESS_WARNING = 'file:process:warning';

export type FileProcessWarning = {
    filename: string;
    reason: string;
};
