import type { IGroup } from '@noodlestan/shared-types';

import { GalleryGroupAttributesDate, GalleryGroupAttributesFolder } from '@/models/gallery/types';

export const makeGalleryGroupItemAttributes = (
    groupBy: IGroup,
    values: string[],
): GalleryGroupAttributesFolder | GalleryGroupAttributesDate => {
    const { group, field } = groupBy;
    switch (group) {
        case 'day':
        case 'month':
        case 'year':
            return {
                groupBy: 'date',
                group,
                field,
                value: values[0],
                date: values[0] ? new Date(values[0]) : undefined,
            };
        case 'folder':
            return {
                groupBy: 'folder',
                root: values[0],
                folder: values[1],
                value: values[0] + values[1],
            };

        default:
            throw new Error(`Unknown group ${group}`);
    }
};
