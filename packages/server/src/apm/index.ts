import { photosAgentQueue } from '../agents/photos';
import { findFolders } from '../controllers/folders/findFolder';
import { findPhotos } from '../controllers/photos/findPhotos';
import { findUsers } from '../controllers/users/findUsers';
import { dbQueue, dbRoots } from '../noodles';

export const makeMeta = async (): Promise<Record<string, unknown>> => {
    const folders = await findFolders({});
    const users = await findUsers();
    const photos = await findPhotos({});
    return {
        objects: {
            users: users.length,
            roots: [...dbRoots().values()].length,
            folders: folders.length,
            photos: photos.length,
        },
        queues: {
            db: dbQueue().length(),
            photos: photosAgentQueue().length(),
        },
    };
};
