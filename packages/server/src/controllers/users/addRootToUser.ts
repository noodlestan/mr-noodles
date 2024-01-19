import type { Root, UserNoodle } from '@noodlestan/shared-types';
import md5 from 'md5';

import { addUserRoot, getNoodleById, updateNoodle, validateRoot } from '../../noodles';

export const addRootToUser = async (userId: string, root: Root): Promise<UserNoodle> => {
    const user = getNoodleById<UserNoodle>(userId);
    const newRoot: Root = {
        ...root,
        id: md5(`${root.name}${Math.random()}`),
        date: new Date(),
    };
    validateRoot(newRoot);
    // TODO request a scan "job" from here (instead of passing TRUE)
    addUserRoot(newRoot, userId, true);

    const roots = [...(user.roots || [])];
    roots.unshift(newRoot);
    const dateUpdated = new Date();
    const updated = {
        ...user,
        roots,
        dateUpdated,
    };

    await updateNoodle(updated);
    return updated;
};
