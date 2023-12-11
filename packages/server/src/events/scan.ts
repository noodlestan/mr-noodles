export const EVENT_SCAN_FILE = 'scan:file';

export type EventScanFile = {
    filename: string;
    relativePath: string;
    baseDir: string;
};

export const EVENT_SCAN_ERROR = 'scan:error';

export type EventScanError = {
    filename: string;
    error: Error;
};
