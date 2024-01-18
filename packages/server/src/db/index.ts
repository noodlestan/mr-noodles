import { findUsers } from '../controllers/users/findUsers';
import { NOODLES_DB_PATH } from '../env';
import { mappers } from '../models/mappers';
import { addUserFolder, connect } from '../noodles';
export { disconnect } from '../noodles';

export const connectSystemRoot = async (): Promise<void> => {
    return connect(NOODLES_DB_PATH, mappers);
};

export const connectAllRoots = async (): Promise<void> => {
    await connectSystemRoot();
    const users = findUsers();
    users.forEach(user => user.folders?.forEach(f => addUserFolder(f, user.id)));
};
