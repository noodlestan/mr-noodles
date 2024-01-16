import { ISort } from '../../query';
import { ImageFile } from '../Images/types';
import { LatLong } from '../types';

export interface PhotoModel {
    id: string;
    type: 'photo';
    filename: string;
    dateCreated: Date;
    dateUpdated?: Date;
    hash: string;
    title?: string;
    images?: ImageFile[];
    dateTaken?: Date;
    orientation: number;
    width: number;
    height: number;
    location?: LatLong;
}

export interface PhotoData extends Omit<PhotoModel, 'dateCreated' | 'dateUpdated' | 'dateTaken'> {
    dateCreated: string;
    dateUpdated?: string;
    dateTaken?: string;
}

export interface PhotoFilter {
    id?: string;
    filename?: string;
    folder?: string;
    title?: string;
    dateFrom?: Date;
    dateUntil?: Date;
    orientation?: number;
    minSize?: number;
    maxSize?: number;
}

export interface PhotoQuery {
    sortBy?: ISort[];
    filterBy?: PhotoFilter;
}
