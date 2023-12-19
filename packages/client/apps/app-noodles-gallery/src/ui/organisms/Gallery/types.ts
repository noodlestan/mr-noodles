import { IGroup } from '@noodlestan/shared-types';

export type GalleryRowOptions = {
    height: number;
    gap?: number;
    maxItems?: number;
    maxWidth?: number;
};
export type GalleryOptions = {
    groupBy: IGroup[] | undefined;
    rows: GalleryRowOptions;
};
