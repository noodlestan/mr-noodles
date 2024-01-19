import type { IGroup } from '@noodlestan/shared-types';

export type GalleryRowOptions = {
    height: number;
    gap?: number;
    maxItems?: number;
    maxWidth?: number;
    showCheckboxes?: boolean;
};

export type GalleryOptions = {
    groupBy: IGroup[] | undefined;
    rows: GalleryRowOptions;
};
