import type { Root, UserNoodle } from '@noodlestan/shared-types';

import { getNoodleById, removeUserRoot, updateNoodle } from '../../noodles';

export const removeRootFromUser = async (userId: string, root: Root): Promise<UserNoodle> => {
    const user = getNoodleById<UserNoodle>(userId);

    const rootIndex = (user.roots || []).findIndex(r => r.id === root.id);
    if (!user.roots || rootIndex < 0) {
        throw new Error('Unknown root');
    }
    const oldRoot = user.roots[rootIndex];
    removeUserRoot(oldRoot, userId);

    const roots = [...(user.roots || [])];
    roots.splice(rootIndex, 1);

    const dateUpdated = new Date();
    const updated = {
        ...user,
        roots,
        dateUpdated,
    };
    updateNoodle(updated);
    return updated;
};
