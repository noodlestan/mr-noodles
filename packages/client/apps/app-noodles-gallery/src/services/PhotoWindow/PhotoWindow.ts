import type { FileNoodle } from '@noodlestan/shared-types';
import { inject } from '@noodlestan/ui-services';
import { Accessor } from 'solid-js';

import { FilesService } from '@/services/Files';

type PhotoWindowService = {
    files: Accessor<FileNoodle[]>;
};

export const createPhotoWindowService = (): PhotoWindowService => {
    const { files } = inject(FilesService);

    return {
        files,
    };
};
