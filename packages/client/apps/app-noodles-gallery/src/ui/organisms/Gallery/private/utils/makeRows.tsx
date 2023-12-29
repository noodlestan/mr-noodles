import type { PhotoData } from '@noodlestan/shared-types';

import { GalleryRowOptions } from '../../types';
import { MAX_ITEMS } from '../createGalleryGroups';

const calcWidth = (items: PhotoData[], height: number): number => {
    return items.reduce((acc, item) => {
        const ratio = item.width / item.height;
        return acc + height * ratio;
    }, 0);
};

const itemFitsInRow = (
    lastRow: PhotoData[],
    item: PhotoData,
    options: GalleryRowOptions,
): boolean => {
    const { height, maxItems = MAX_ITEMS, maxWidth } = options;
    if (lastRow.length >= maxItems) {
        return false;
    }
    if (maxWidth) {
        const currentWidth = calcWidth(lastRow, height);
        const itemWidth = calcWidth([item], height);
        if (currentWidth + itemWidth >= maxWidth) {
            return false;
        }
    }
    return true;
};

export const makeRows = (items: PhotoData[], options: GalleryRowOptions): PhotoData[][] => {
    return items.reduce(
        (acc, item) => {
            const lastRow = acc[acc.length - 1];
            const fits = itemFitsInRow(lastRow, item, options);
            if (fits) {
                lastRow.push(item);
            } else {
                acc.push([item]);
            }
            return acc;
        },
        [[]] as PhotoData[][],
    );
};
