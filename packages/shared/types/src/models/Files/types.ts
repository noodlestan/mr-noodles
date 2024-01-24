import { ISort } from '../../query/index.js';
import { BaseNoodle, LocatableNoodle } from '../Noodles/types.js';

export interface FileNoodle extends LocatableNoodle, BaseNoodle {
    type: 'file';
}

export interface FileFilter {
    root?: string;
    owner?: string;
    id?: string;
    filename?: string;
    mediaType?: string;
    folder?: string;
    title?: string;
    dateFrom?: Date;
    dateUntil?: Date;
    orientation?: number;
    minSize?: number;
    maxSize?: number;
}

export interface FileQuery {
    sortBy?: ISort[];
    filterBy?: FileFilter;
}
