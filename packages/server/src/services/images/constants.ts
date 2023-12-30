import { ImageProfile } from '@noodlestan/shared-types';

export const IMAGE_FULL_MAX: ImageProfile = {
    name: 'full.max',
    width: 4000,
    height: 4000,
    fit: 'inside',
};

export const IMAGE_FULL_FAST: ImageProfile = {
    name: 'full.fast',
    width: 2000,
    height: 2000,
    fit: 'inside',
};

export const IMAGE_THUMB_BIG: ImageProfile = {
    name: 'thumb.big',
    height: 600,
    fit: 'contain',
};

export const IMAGE_THUMB_SMALL: ImageProfile = {
    name: 'thumb.small',
    height: 200,
    fit: 'contain',
};

export const IMAGE_PROFILES: Array<ImageProfile> = [
    IMAGE_FULL_MAX,
    IMAGE_FULL_FAST,
    IMAGE_THUMB_BIG,
    IMAGE_THUMB_SMALL,
];
