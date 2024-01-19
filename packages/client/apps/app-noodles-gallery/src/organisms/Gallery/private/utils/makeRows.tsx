import type { FileNoodle, MediaFileNoodle } from '@noodlestan/shared-types';

import { GalleryRowOptions } from '../../types';
import { MAX_ITEMS } from '../createGalleryGroups';

const GAP_SIZE = 8;

const calcWidth = (items: FileNoodle[], targetHeight: number): number => {
    return items.reduce((acc, item) => {
        const media = item as MediaFileNoodle;
        const { height, width } = media;
        const ratio = height && width ? height / width : 1;
        return acc + targetHeight / ratio;
    }, GAP_SIZE * items.length);
};

const itemFitsInRow = (
    lastRow: FileNoodle[],
    item: FileNoodle,
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

export const makeRows = (items: FileNoodle[], options: GalleryRowOptions): FileNoodle[][] => {
    return items.reduce(
        (acc, item) => {
            const lastRow = acc[acc.length - 1];
            const isRowEmpty = !lastRow.length;
            const fits = itemFitsInRow(lastRow, item, options);
            if (isRowEmpty || fits) {
                lastRow.push(item);
            } else {
                acc.push([item]);
            }
            return acc;
        },
        [[]] as FileNoodle[][],
    );
};
