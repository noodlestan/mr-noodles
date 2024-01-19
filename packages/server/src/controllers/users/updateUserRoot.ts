import type { Root, UserNoodle } from '@noodlestan/shared-types';

import {
    addUserRoot,
    getNoodleById,
    removeUserRoot,
    updateNoodle,
    validateRoot,
} from '../../noodles';

export const updateUserRoot = async (userId: string, root: Root): Promise<UserNoodle> => {
    const user = getNoodleById<UserNoodle>(userId);

    const rootIndex = (user.roots || []).findIndex(r => r.id === root.id);
    if (!user.roots || rootIndex < 0) {
        throw new Error('Unknown root');
    }
    const oldRoot = user.roots[rootIndex];
    const newRoot: Root = {
        ...oldRoot,
        name: root.name,
        path: root.path,
    };

    validateRoot(root);
    const pathChanged = newRoot?.path !== oldRoot.path;
    if (pathChanged) {
        // TODO request a scan "job" from here (instead of passing TRUE)
        removeUserRoot(oldRoot, userId);
        addUserRoot(newRoot, userId, true);
    }

    const roots = [...(user.roots || [])];
    roots[rootIndex] = root;

    const dateUpdated = new Date();
    const updated = {
        ...user,
        roots,
        dateUpdated,
    };
    updateNoodle(updated);
    return updated;
};
