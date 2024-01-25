import type { IGroup, ImageNoodle } from '@noodlestan/shared-types';

import { GalleryOptions } from '../../types';

import { makeGalleryGroupItemAttributes } from './makeGalleryGroupItemAttributes';
import { makeRows } from './makeRows';
import { GalleryGroupList, GallerySubGroupList } from './types';

import { GalleryGroup, GalleryGroupItem, GallerySubGroupItem } from '@/models/gallery/types';

export const groupTuplesToGroups = (
    records: GalleryGroupList,
    groupBy1: IGroup,
    groupBy2: IGroup | undefined,
    options: GalleryOptions,
): GalleryGroup[] => {
    const is2levels = !!groupBy2;
    return records.map(([values1, subGroupOrItems]) => {
        const attributes = makeGalleryGroupItemAttributes(groupBy1, values1);
        if (is2levels) {
            const subGroups = groupTuplesToGroups(
                subGroupOrItems as GallerySubGroupList,
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
            rows: makeRows(subGroupOrItems as ImageNoodle[], options.rows),
        } as GallerySubGroupItem;
    });
};
