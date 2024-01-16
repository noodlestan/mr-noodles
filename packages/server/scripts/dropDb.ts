import { findUsers } from '../src/controllers/users/findUsers';
import { addUserFolder, connect, dbRoots, disconnect } from '../src/db';
import { dropRoot } from '../src/db/private/functions/dropRoot';
import { NOODLES_DB_PATH } from '../src/env';
import { createLogger } from '../src/logger';
import { mappers } from '../src/models/mappers';

const logger = createLogger('scripts/dropDb');

const main = async () => {
    try {
        await connect(NOODLES_DB_PATH, mappers);
        logger.info('adding user roots');
        const users = findUsers();
        users.forEach(user => user.folders?.forEach(f => addUserFolder(f, user.id)));
        logger.info('boot');

        const values = dbRoots().values();
        [...values].forEach(async root => {
            await dropRoot(root);
        });

        logger.info('shutting down');
        await disconnect();
    } catch (err) {
        logger.error('main', err as Error);
        process.exit(1);
    }
};

main();
