import { basename, dirname, join } from 'path';

import type { Noodle, Root } from '@noodlestan/shared-types';

import { NOODLES_DB_EXT } from '../../../env';

export const dataFilename = (root: Root, noodle: Noodle, filename: string): string => {
    return noodle.type === 'folder'
        ? join(root.path, filename, NOODLES_DB_EXT)
        : join(root.path, dirname(filename), '.' + basename(filename) + NOODLES_DB_EXT);
};
