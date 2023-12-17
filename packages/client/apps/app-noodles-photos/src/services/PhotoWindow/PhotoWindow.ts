import type { PhotoData } from '@noodlestan/shared-types';
import { Accessor } from 'solid-js';

import { inject } from '../inject';

import { PhotosService } from '@/services/Photos';

type PhotoWindowService = {
    photos: Accessor<PhotoData[]>;
};

export const createPhotoWindowService = (): PhotoWindowService => {
    const { photos } = inject(PhotosService);

    return {
        photos,
    };
};
