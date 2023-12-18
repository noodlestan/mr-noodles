import { IGroup, PhotoData } from '@noodlestan/shared-types';

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
                date: new Date(value),
            };

        default:
            switch (field) {
                case 'album':
                    return {
                        groupBy: 'album',
                        value,
                        album: value,
                    };
                default:
                    throw new Error(`Unknown ${group}`);
            }
    }
};

const getGroupValue = (groupBy: IGroup, value: string | string): string => {
    const { group } = groupBy;
    if (group === 'year') {
        const date = new Date(value);
        return `${date?.getFullYear()}-${date?.getMonth()}}`;
    }
    if (group === 'month') {
        const date = new Date(value);
        return `${date?.getFullYear()}-${date?.getMonth()}}`;
    }
    if (group === 'day') {
        const date = new Date(value);
        return `${date?.getFullYear()}-${date?.getMonth()}-${date?.getDay()}`;
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

const makeRows = (items: PhotoData[]): PhotoData[][] => {
    return items.reduce(
        (acc, item) => {
            const lastRow = acc[acc.length - 1];
            const fits = lastRow.length < 3;
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
    groupBy2?: IGroup | undefined,
): GalleryGroup[] => {
    const is2levels = !!groupBy2;
    return Object.entries(records).map(([key1, subGroupOrItems]) => {
        const attributes = getGalleryGroupItemAttributes(groupBy1, key1);
        if (is2levels) {
            return {
                attributes,
                groups: recordsToGroups(subGroupOrItems as GallerySubGroupRecord, groupBy2),
            } as GalleryGroupItem;
        }
        return {
            attributes,
            rows: makeRows(subGroupOrItems as PhotoData[]),
        } as GallerySubGroupItem;
    });
};

const createGalleryGroups = (
    groupBy: IGroup[] | undefined,
    items: PhotoData[] | undefined,
): GalleryGroupItem[] => {
    const groupBy1 = groupBy && groupBy[0];
    const groupBy2 = groupBy && groupBy[1];
    if (!groupBy1) {
        throw new Error('Not implemented');
    }
    if (items) {
        const records = reducePhotosToRecords(items, groupBy1, groupBy2);
        return recordsToGroups(records, groupBy1, groupBy2);
    }
    return [];
};

export { createGalleryGroups };
