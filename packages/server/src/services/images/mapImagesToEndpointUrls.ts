import { ImageFile } from '@noodlestan/shared-types';

import { PUBLIC_ASSETS_BASE_URL } from '../../env';

const makeImageEndpointUrl = (filename: string): string => {
    return `${PUBLIC_ASSETS_BASE_URL}/${filename}`;
};

export const mapImagesToEndpointUrls = (images: ImageFile[]): ImageFile[] => {
    return (images || []).map(image => {
        const { p, w, h, f } = image;
        return {
            p,
            w,
            h,
            f: makeImageEndpointUrl(f),
        };
    });
};
