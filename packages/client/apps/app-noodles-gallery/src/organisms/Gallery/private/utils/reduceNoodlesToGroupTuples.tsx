import type { BaseNoodle, IGroup } from '@noodlestan/shared-types';

import { GalleryGroupList, GalleryGroupTuple, GallerySubGroupTuple } from './types';

function get<T>(object: unknown, field: string): T {
    return (object as Record<string, unknown>)[field] as T;
}

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

const accumulateItem = (
    acc: GalleryGroupList,
    isTwoLevels: boolean,
    value1: string | undefined,
    value2: string | undefined,
    item: BaseNoodle,
) => {
    const key1 = String(value1);
    const key2 = String(value2);
    if (isTwoLevels) {
        const index1 = acc.findIndex(([key]) => key === key1);
        const group1: GalleryGroupTuple =
            index1 > -1 ? (acc[index1] as GalleryGroupTuple) : [key1, []];
        if (index1 === -1) {
            acc.push(group1);
        }
        const index2 = group1[1].findIndex(([key]) => key === key2);
        const group2: GallerySubGroupTuple =
            index2 > -1
                ? (group1[1][index2] as [string, BaseNoodle[]])
                : [key2, [] as BaseNoodle[]];
        if (index2 === -1) {
            group1[1].push(group2);
        }
        group2[1].push(item);
    } else {
        const index1 = acc.findIndex(([key]) => key === key1);
        const group1: GallerySubGroupTuple =
            index1 > -1 ? (acc[index1] as [string, BaseNoodle[]]) : [key1, []];
        if (index1 === -1) {
            acc.push(group1);
        }
        group1[1].push(item);
    }
};

export const reduceNoodlesToGroupTuples = (
    items: BaseNoodle[],
    groupBy1: IGroup,
    groupBy2: IGroup | undefined,
): GalleryGroupList => {
    return items.reduce((acc, item) => {
        const value1 = getGroupValue(groupBy1, get<string>(item, groupBy1.field));
        const value2 = groupBy2 && getGroupValue(groupBy2, get<string>(item, groupBy2.field));
        accumulateItem(acc, !!groupBy2, value1, value2, item);
        return acc;
    }, [] as GalleryGroupList);
};
