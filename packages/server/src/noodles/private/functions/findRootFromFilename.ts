import type { Root, Roots } from '@noodlestan/shared-types';

export const findRootFromFilename = (roots: Roots, filename: string): Root | undefined => {
    return [...roots.values()].find(r => filename.startsWith(r.path));
};
