import type { PhotoData } from '@noodlestan/shared-types';

import { GalleryOptions } from '../types';

import { groupTuplesToGroups } from './utils/groupTuplesToGroups';
import { reducePhotosToGroupTuples } from './utils/reducePhotosToGroupTuples';

import { GalleryGroupItem } from '@/ui/models/gallery/types';

export const MAX_ITEMS = 10;

const createGalleryGroups = (
    items: PhotoData[] | undefined,
    options: GalleryOptions,
): GalleryGroupItem[] => {
    const { groupBy } = options;
    const groupBy1 = groupBy && groupBy[0];
    const groupBy2 = groupBy && groupBy[1];
    if (!groupBy1) {
        throw new Error('Not implemented');
    }
    if (items) {
        const records = reducePhotosToGroupTuples(items, groupBy1, groupBy2);
        return groupTuplesToGroups(records, groupBy1, groupBy2, options);
    }
    return [];
};

export { createGalleryGroups };
