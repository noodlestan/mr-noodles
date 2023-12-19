import type { IGroup, PhotoData } from '@noodlestan/shared-types';

import { GalleryOptions, GalleryRowOptions } from './types';

import {
    GalleryGroup,
    GalleryGroupAttributesAlbum,
    GalleryGroupAttributesDate,
    GalleryGroupItem,
    GallerySubGroupItem,
} from '@/ui/models/gallery/types';

export type GallerySubGroupRecord = Record<string, PhotoData[]>;
export type GalleryGroupRecord = Record<string, PhotoData[] | GallerySubGroupRecord>;

const getGalleryGroupItemAttributes = (
    groupBy: IGroup,
    value: string,
): GalleryGroupAttributesAlbum | GalleryGroupAttributesDate => {
    const { group, field } = groupBy;
    switch (group) {
        case 'day':
        case 'month':
        case 'year':
            return {
                groupBy: 'date',
                group,
                field,
                value,
                date: value ? new Date(value) : undefined,
            };

        default:
            switch (field) {
                case 'album':
                    return {
                        groupBy: 'album',
                        value,
                        album: value || undefined,
                    };
                default:
                    throw new Error(`Unknown ${group}`);
            }
    }
};

const getGroupValue = (groupBy: IGroup, value: string | string): string => {
    const { group } = groupBy;
    if (!value) {
        return '';
    }
    if (group === 'year') {
        const date = new Date(value);
        return `${date?.getFullYear()}}`;
    }
    if (group === 'month') {
        const date = new Date(value);
        return `${date?.getFullYear()}-${date?.getMonth() + 1}}`;
    }
    if (group === 'day') {
        const date = new Date(value);
        return `${date?.getFullYear()}-${date?.getMonth() + 1}-${date?.getDate()}`;
    } else {
        return value || '';
    }
};

function get<T>(object: unknown, field: string): T {
    return (object as Record<string, unknown>)[field] as T;
}

const accumulateRecord = (
    acc: GalleryGroupRecord,
    isTwoLevels: boolean,
    value1: string | undefined,
    value2: string | undefined,
    item: PhotoData,
) => {
    const key1 = String(value1);
    const key2 = String(value2);
    if (isTwoLevels) {
        const group1 = (acc[key1] || {}) as Record<string, PhotoData[]>;
        acc[key1] = group1;
        const group = group1[key2] || [];
        group.push(item);
        (acc[key1] as Record<string, PhotoData[]>)[key2] = group;
    } else {
        const group = (acc[key1] as PhotoData[]) || [];
        group.push(item);
        (acc[key1] as PhotoData[]) = group;
    }
};

const reducePhotosToRecords = (
    items: PhotoData[],
    groupBy1: IGroup,
    groupBy2: IGroup | undefined,
): GalleryGroupRecord => {
    return items.reduce((acc, item) => {
        const value1 = getGroupValue(groupBy1, get<string>(item, groupBy1.field));
        const value2 = groupBy2 && getGroupValue(groupBy2, get<string>(item, groupBy2.field));
        accumulateRecord(acc, !!groupBy2, value1, value2, item);
        return acc;
    }, {} as GalleryGroupRecord);
};

const MAX_ITEMS = 10;

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

const makeRows = (items: PhotoData[], options: GalleryRowOptions): PhotoData[][] => {
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

const recordsToGroups = (
    records: GalleryGroupRecord,
    groupBy1: IGroup,
    groupBy2: IGroup | undefined,
    options: GalleryOptions,
): GalleryGroup[] => {
    const is2levels = !!groupBy2;
    return Object.entries(records).map(([key1, subGroupOrItems]) => {
        const attributes = getGalleryGroupItemAttributes(groupBy1, key1);
        if (is2levels) {
            const subGroups = recordsToGroups(
                subGroupOrItems as GallerySubGroupRecord,
                groupBy2,
                undefined,
                options,
            );
            return {
                attributes,
                groups: subGroups,
            } as GalleryGroupItem;
        }
        return {
            attributes,
            rows: makeRows(subGroupOrItems as PhotoData[], options.rows),
        } as GallerySubGroupItem;
    });
};

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
        const records = reducePhotosToRecords(items, groupBy1, groupBy2);
        return recordsToGroups(records, groupBy1, groupBy2, options);
    }
    return [];
};

export { createGalleryGroups };
