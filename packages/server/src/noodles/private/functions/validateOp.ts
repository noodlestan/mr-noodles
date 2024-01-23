import type { Noodle, Root, Roots } from '@noodlestan/shared-types';

export const validateOp = (roots: Roots, noodle: Noodle): Root => {
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
    const root = roots.get(noodle.root);
    if (!root) {
        throw new Error(`noodles:validateOp:invalid root "${noodle.root}" for file "${filename}"`);
    }

    return root;
};
