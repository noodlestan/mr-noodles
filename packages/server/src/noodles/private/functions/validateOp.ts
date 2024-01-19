import type { Noodle, Roots } from '@noodlestan/shared-types';

import { findRootFromFilename } from './findRootFromFilename';

export const validateOp = (roots: Roots, noodle: Noodle): void => {
    const { id, filename, type } = noodle;
    if (!filename) {
        throw new Error(`noodles:validateOp:no filename for id "${id}"`);
    }
    if (!id) {
        throw new Error(`noodles:validateOp:no id for file "${filename}"`);
    }
    if (!type) {
        throw new Error(`noodles:validateOp:no type for file "${filename}"`);
    }
    if (!findRootFromFilename(roots, noodle.filename)) {
        throw new Error(`noodles:validateOp:no root for file "${filename}"`);
    }
};
