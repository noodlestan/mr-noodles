import { Noodle, Roots } from '../../types';

export const validateOp = (roots: Roots, noodle: Noodle): void => {
    const { id, filename, type } = noodle;
    if (!filename) {
        throw new Error(`db:validateOp:no filename for id "${id}"`);
    }
    if (!id) {
        throw new Error(`db:validateOp:no id for file "${filename}"`);
    }
    if (!type) {
        throw new Error(`db:validateOp:no type for file "${filename}"`);
    }
    const root = [...roots.values()].find(r => filename.startsWith(r.path));
    if (!root) {
        throw new Error(`db:validateOp:no root match for "${filename}"`);
    }
};
