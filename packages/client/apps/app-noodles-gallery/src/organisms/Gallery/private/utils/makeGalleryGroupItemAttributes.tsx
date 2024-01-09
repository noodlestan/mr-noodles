import type { IGroup } from '@noodlestan/shared-types';

import { GalleryGroupAttributesAlbum, GalleryGroupAttributesDate } from '@/models/gallery/types';

export const makeGalleryGroupItemAttributes = (
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
