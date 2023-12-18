import { ISort } from '../../query';
import { Thumb } from '../Thumbs/types';

export interface PhotoSchema {
    dateCreated: Date;
    dateUpdated?: Date;
    hash: string;
    filename: string;
    album?: string;
    title?: string;
    thumbs?: Thumb[];
    date?: Date;
    orientation: number;
    width: number;
    height: number;
    location?: {
        type: string;
        coordinates: Array<number>;
    };
}

export interface PhotoData extends Omit<PhotoSchema, 'location'> {
    id: string;
    location?: {
        lat: number;
        long: number;
    };
}

export interface PhotoDataPublic extends Omit<PhotoData, 'dateCreated' | 'dateUpdated' | 'date'> {
    dateCreated: string;
    dateUpdated?: string;
    date?: string;
}

export interface PhotoFilter {
    id?: string;
    filename?: string;
    album?: string;
    title?: string;
    dateFrom?: Date;
    dateUntil?: Date;
    orientation?: number;
    minSize?: number;
    maxSize?: number;
    aspectRatio?: number;
    location?: {
        lat: number;
        long: number;
    };
}

export interface PhotoQuery {
    sortBy?: ISort[];
    filterBy?: PhotoFilter;
}
