import type { PhotoData } from '@noodlestan/shared-types';
import { inject } from '@noodlestan/ui-services';
import { Accessor } from 'solid-js';

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
