import { Noodle, Roots } from '../../types';

import { findRoot } from './findRoot';

export const validateOp = (roots: Roots, noodle: Noodle): void => {
    const { id, filename, type } = noodle;
    if (!filename) {
        throw new Error(`noodlesvalidateOp:no filename for id "${id}"`);
    }
    if (!id) {
        throw new Error(`noodlesvalidateOp:no id for file "${filename}"`);
    }
    if (!type) {
        throw new Error(`noodlesvalidateOp:no type for file "${filename}"`);
    }
    // validates that root exists
    findRoot(roots, noodle.filename);
};
