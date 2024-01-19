import { filesAgentQueue } from '../agents/files';
import { findFiles } from '../controllers/files/findFiles';
import { findFolders } from '../controllers/folders/findFolder';
import { findUsers } from '../controllers/users/findUsers';
import { dbQueue, dbRoots } from '../noodles';

export const makeMeta = async (): Promise<Record<string, unknown>> => {
    const folders = await findFolders({});
    const users = await findUsers();
    const files = await findFiles({});
    return {
        objects: {
            users: users.length,
            roots: [...dbRoots().values()].length,
            folders: folders.length,
            files: files.length,
        },
        queues: {
            db: dbQueue().length(),
            files: filesAgentQueue().length(),
        },
    };
};
