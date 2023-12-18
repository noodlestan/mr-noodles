import { Thumb } from '@noodlestan/shared-types';

import { PUBLIC_ASSETS_BASE_URL } from '../../env';

export const makeThumbPublicUrl = (filename: string): string => {
    return `${PUBLIC_ASSETS_BASE_URL}/${filename}`;
};

export const mapThumbFilenamesToUrls = (thumbs: Thumb[]): Thumb[] => {
    return (thumbs || []).map(thumb => {
        const { f, h } = thumb;
        return {
            h,
            f: makeThumbPublicUrl(f),
        };
    });
};
