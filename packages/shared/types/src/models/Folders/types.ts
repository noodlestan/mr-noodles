import { ImageFile } from '../Images/types';
import { LatLong } from '../types';

export interface FolderModel {
    id: string;
    type: 'folder';
    filename: string;
    dateCreated: Date;
    dateUpdated?: Date;
    title?: string;
    images?: ImageFile[];
    dateFrom?: Date;
    dateUntil?: Date;
    location?: LatLong;
}

export interface FolderData
    extends Omit<FolderModel, 'dateCreated' | 'dateUpdated' | 'dateFrom' | 'dateUntil'> {
    dateCreated: string;
    dateUpdated?: string;
    dateFrom?: string;
    dateUntil?: string;
}
