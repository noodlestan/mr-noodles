import { photosAgentQueue, startPhotosAgent, stopPhotosAgent } from '../src/agents/photos';
import { startScanAgent, stopScanAgent } from '../src/agents/scanner';
import { findUsers } from '../src/controllers/users/findUsers';
import { addUserFolder, connect, disconnect } from '../src/db';
import { NOODLES_DB_PATH } from '../src/env';
import { createLogger } from '../src/logger';
import { mappers } from '../src/models/mappers';
import { defer } from '../src/utils/flow/defer';

const logger = createLogger('scripts/scan');

const shutdown = async () => {
    logger.info('shutting down');
    await disconnect();
    await stopPhotosAgent();
    await stopScanAgent();
};

const monitor = async () => {
    const queue = photosAgentQueue();

    while (queue.length()) {
        await defer(() => undefined, 1000);
    }

    await defer(shutdown, 1000);
};

const main = async () => {
    try {
        await startPhotosAgent();
        await startScanAgent();
        await connect(NOODLES_DB_PATH, mappers);
        logger.info('adding user roots');
        const users = findUsers();
        users.forEach(user => user.folders?.forEach(f => addUserFolder(f, user.id)));
        logger.info('boot');
        await defer(monitor, 1000);
        logger.info('done');
    } catch (err) {
        logger.error('main', err as Error);
        process.exit(1);
    }
};

main();
