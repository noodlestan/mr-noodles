import type { Root } from '@noodlestan/shared-types';

export const EVENT_SCAN_DATA = 'scan:data';
export const EVENT_SCAN_FILE = 'scan:file';

export type EventScanFile = {
    filename: string;
    relativePath: string;
    root: Root;
};
export const EVENT_SCAN_DIR = 'scan:dir';

export type EventScanDir = {
    dirname: string;
    relativePath: string;
    root: Root;
};

export const EVENT_SCAN_ERROR = 'scan:error';

export type EventScanError = {
    filename: string;
    error: Error;
    root: Root;
};
