import type { Root } from '@noodlestan/shared-types';
import { mappers } from '@noodlestan/shared-types';

import { findUsers } from '../controllers/users/findUsers';
import { NOODLES_DB_PATH } from '../env';
import { addUserRoot, connect } from '../noodles';
export { disconnect } from '../noodles';

export const connectSystemRoot = async (doHardScan?: boolean): Promise<Root> => {
    return connect(NOODLES_DB_PATH, mappers, doHardScan);
};

export const connectAllRoots = async (doHardScan?: boolean): Promise<void> => {
    await connectSystemRoot(doHardScan);
    const users = findUsers();
    const p = users.flatMap(
        user => user.roots?.map(root => addUserRoot(root, user.id, doHardScan)),
    );
    await Promise.all(p);
};
