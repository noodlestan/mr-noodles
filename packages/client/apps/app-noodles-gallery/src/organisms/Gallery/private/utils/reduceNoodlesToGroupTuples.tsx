import type { BaseNoodle, IGroup } from '@noodlestan/shared-types';

import { GalleryGroupList, GalleryGroupTuple, GallerySubGroupTuple } from './types';

function get<T>(object: unknown, field: string): T {
    return (object as Record<string, T>)[field] as T;
}

const pad2 = (v: number | undefined): string => {
    if (!v) {
        return '00';
    }
    if (v < 10) {
        return '0' + v;
    }
    return '' + v;
};

const getGroupValues = (groupBy: IGroup, noodle: BaseNoodle, field: string): string[] => {
    const { group } = groupBy;

    if (group === 'year') {
        const value = get<string>(noodle, field);
        const date = new Date(value);
        return [`${date?.getFullYear()}`];
    }
    if (group === 'month') {
        const value = get<string>(noodle, field);
        const date = new Date(value);
        return [`${date?.getFullYear()}-${pad2(date?.getMonth() + 1)}`];
    }
    if (group === 'day') {
        const value = get<string>(noodle, field);
        const date = new Date(value);

        return [`${date?.getFullYear()}-${pad2(date?.getMonth() + 1)}-${pad2(date?.getDate())}`];
    } else if (group === 'folder') {
        return [noodle.root, noodle.filename.split('/').slice(0, -1).join('/')];
    }
    return [];
};

const accumulateItem = (
    acc: GalleryGroupList,
    isTwoLevels: boolean,
    values1: string[],
    values2: string[] | undefined,
    item: BaseNoodle,
) => {
    const key1 = values1.join('!');
    const key2 = values2?.join('!');
    if (isTwoLevels) {
        const index1 = acc.findIndex(([key]) => key.join('!') === key1);
        const group1: GalleryGroupTuple =
            index1 > -1 ? (acc[index1] as GalleryGroupTuple) : [values1, []];
        if (index1 === -1) {
            acc.push(group1);
        }
        const index2 = group1[1].findIndex(([key]) => key.join('!') === key2);
        const group2: GallerySubGroupTuple =
            index2 > -1 ? group1[1][index2] : [values2 as string[], []];
        if (index2 === -1) {
            group1[1].push(group2);
        }
        group2[1].push(item);
    } else {
        const index1 = acc.findIndex(([key]) => key.join('!') === key1);
        const group1: GallerySubGroupTuple =
            index1 > -1 ? (acc[index1] as GallerySubGroupTuple) : [values1, []];
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
        const values1 = getGroupValues(groupBy1, item, groupBy1.field);
        const values2 = groupBy2 && getGroupValues(groupBy2, item, groupBy2.field);
        accumulateItem(acc, !!groupBy2, values1, values2, item);
        return acc;
    }, [] as GalleryGroupList);
};
