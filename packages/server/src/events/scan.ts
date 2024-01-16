export const EVENT_SCAN_FILE_DATA = 'scan:file:data';
export const EVENT_SCAN_FILE_IMAGE = 'scan:file:image';

export type EventScanFile = {
    filename: string;
    relativePath: string;
    root: string;
};
export const EVENT_SCAN_DIR = 'scan:dir';

export type EventScanDir = {
    dirname: string;
    relativePath: string;
    root: string;
};

export const EVENT_SCAN_ERROR = 'scan:error';

export type EventScanError = {
    filename: string;
    error: Error;
    root: string;
};
