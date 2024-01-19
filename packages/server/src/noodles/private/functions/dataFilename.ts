import { basename, dirname, join } from 'path';

import type { Noodle } from '@noodlestan/shared-types';

import { NOODLES_DB_EXT } from '../../../env';

export const dataFilename = (noodle: Noodle, filename: string): string => {
    return noodle.type === 'folder'
        ? join(filename, NOODLES_DB_EXT)
        : join(dirname(filename), '.' + basename(filename) + NOODLES_DB_EXT);
};
