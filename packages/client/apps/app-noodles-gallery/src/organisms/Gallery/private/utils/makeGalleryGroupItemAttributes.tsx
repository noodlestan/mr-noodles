import type { IGroup } from '@noodlestan/shared-types';

import { GalleryGroupAttributesDate, GalleryGroupAttributesFolder } from '@/models/gallery/types';

export const makeGalleryGroupItemAttributes = (
    groupBy: IGroup,
    value: string,
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
                value,
                date: value ? new Date(value) : undefined,
            };

        default:
            switch (field) {
                case 'folder':
                    return {
                        groupBy: 'folder',
                        value,
                        folder: value || undefined,
                    };
                default:
                    throw new Error(`Unknown ${group}`);
            }
    }
};
