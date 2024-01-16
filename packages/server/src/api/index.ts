import { startPhotosAgent } from '../agents/photos';
import { startScanAgent } from '../agents/scanner';
import { findUsers } from '../controllers/users/findUsers';
import { addUserFolder, connect } from '../db';
import { NOODLES_DB_PATH } from '../env';
import { createLogger } from '../logger';
import { mappers } from '../models/mappers';

import { start } from './app';

const logger = createLogger('server/api');

const main = async () => {
    try {
        await startScanAgent();
        await startPhotosAgent();
        await connect(NOODLES_DB_PATH, mappers);
        logger.info('adding user roots');
        const users = findUsers();
        users.forEach(user => user.folders?.forEach(f => addUserFolder(f, user.id)));

        logger.info('starting server');
        await start();
        logger.info('boot');
    } catch (err) {
        logger.error('main', err as Error);
        process.exit(1);
    }
};

main();
