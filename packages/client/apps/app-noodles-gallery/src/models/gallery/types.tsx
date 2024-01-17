import type { PhotoModel } from '@noodlestan/shared-types';

export type GalleryGroupAttributesFolder = {
    groupBy: 'folder';
    value: string;
    folder?: string;
};

export type GalleryGroupAttributesDate = {
    groupBy: 'date';
    group: string;
    field: string;
    value: string;
    date?: Date;
};

export type GalleryGroupAttributes = GalleryGroupAttributesFolder | GalleryGroupAttributesDate;

export type GalleryGroupItem = {
    groups?: GallerySubGroupItem[];
    attributes: GalleryGroupAttributes;
};

export type GallerySubGroupItem = {
    rows?: PhotoModel[][];
    attributes: GalleryGroupAttributes;
};

export type GalleryGroup = GallerySubGroupItem | GalleryGroupItem;
