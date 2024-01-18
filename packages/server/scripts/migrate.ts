import { photosAgentQueue } from '../src/agents/photos';
import { makeMeta } from '../src/apm';
import { connectAllRoots, disconnect } from '../src/db';
import { createLogger } from '../src/logger';
import { defer } from '../src/utils/flow/defer';

const logger = createLogger('scripts/scan');

const shutdown = async () => {
    logger.info('shutting down');
    await disconnect();
};

const monitor = async () => {
    const queue = photosAgentQueue();

    while (queue.length()) {
        await defer(() => undefined, 1000);
    }

    await defer(shutdown, 1000);
};

// const migrateUserFolders = () => {
//     const users = findUsers();
//     users.forEach(user => {
//         if (user.folders && typeof user.folders[0] === 'string') {
//             user.folders = user.folders.map(f => ({
//                 path: f as unknown as string,
//                 name: 'photos',
//             }));
//             updateNoodle(user);
//         }
//     });
// };

const main = async () => {
    try {
        await connectAllRoots();
        logger.info('boot');
        // run migrations here
        // migrateUserFolders();

        await defer(monitor, 1000);
        logger.info('done');
        const m = await makeMeta();
        logger.info('meta', m);
    } catch (err) {
        logger.error('main', err as Error);
        process.exit(1);
    }
};

main();
