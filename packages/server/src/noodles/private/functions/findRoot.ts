import { Root, Roots } from '../../types';

export const findRoot = (roots: Roots, filename: string): Root => {
    const root = [...roots.values()].find(r => filename.startsWith(r.path));
    if (!root) {
        throw new Error(`noodlesfindRoot:no root match for "${filename}"`);
    }
    return root;
};
