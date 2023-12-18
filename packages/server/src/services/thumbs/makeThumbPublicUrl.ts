import path from 'path';

import { Thumb } from '@noodlestan/shared-types';

import { PUBLIC_ASSETS_BASE_URL } from '../../env';

export const makeThumbPublicUrl = (filename: string): string => {
    return path.join(PUBLIC_ASSETS_BASE_URL, filename);
};

export const mapThumbs = (thumbs: Thumb[]): Thumb[] => {
    return (thumbs || []).map(thumb => {
        const { f, h } = thumb;
        return {
            h,
            f: makeThumbPublicUrl(f),
        };
    });
};
