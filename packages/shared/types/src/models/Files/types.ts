import { ISort } from '../../query';
import { BaseNoodle, LocatableNoodle } from '../Noodles/types';

export interface FileNoodle extends LocatableNoodle, BaseNoodle {
    type: 'file';
}

export interface FileFilter {
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
