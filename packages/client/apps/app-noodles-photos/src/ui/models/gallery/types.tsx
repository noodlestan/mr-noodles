import { PhotoData } from '@noodlestan/shared-types';

export type GalleryGroupAttributesAlbum = {
    groupBy: 'album';
    value: string;
    album: string;
};

export type GalleryGroupAttributesDate = {
    groupBy: 'date';
    group: string;
    field: string;
    value: string;
    date: Date;
};

export type GalleryGroupAttributes = GalleryGroupAttributesAlbum | GalleryGroupAttributesDate;

export type GalleryGroupItem = {
    groups?: GallerySubGroupItem[];
    attributes: GalleryGroupAttributes;
};

export type GallerySubGroupItem = {
    items?: PhotoData[];
    attributes: GalleryGroupAttributes;
};

export type GalleryGroup = GallerySubGroupItem | GalleryGroupItem;
