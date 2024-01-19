import type { FileNoodle } from '@noodlestan/shared-types';

import { GalleryOptions } from '../types';

import { groupTuplesToGroups } from './utils/groupTuplesToGroups';
import { reduceNoodlesToGroupTuples } from './utils/reduceNoodlesToGroupTuples';

import { GalleryGroupItem } from '@/models/gallery/types';

export const MAX_ITEMS = 10;

const createGalleryGroups = (
    items: FileNoodle[] | undefined,
    options: GalleryOptions,
): GalleryGroupItem[] => {
    const { groupBy } = options;
    const groupBy1 = groupBy && groupBy[0];
    const groupBy2 = groupBy && groupBy[1];
    if (!groupBy1) {
        throw new Error('Not implemented');
    }
    if (items) {
        const records = reduceNoodlesToGroupTuples(items, groupBy1, groupBy2);
        return groupTuplesToGroups(records, groupBy1, groupBy2, options);
    }
    return [];
};

export { createGalleryGroups };
