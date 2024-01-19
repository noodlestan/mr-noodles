import type { HashableNoodle } from '@noodlestan/shared-types';

import { findNoodle } from '../../noodles';

export const findFileByHash = (hash: string): HashableNoodle | undefined => {
    return findNoodle<HashableNoodle>(n => {
        return n.type === 'file' && hash.length > 0 && n.hash === hash;
    });
};
