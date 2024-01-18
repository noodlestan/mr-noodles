import { startPhotosAgent } from '../agents/photos';
import { startScanAgent } from '../agents/scanner';
import { connectAllRoots } from '../db';
import { createLogger } from '../logger';

import { start } from './app';

const logger = createLogger('server/api');

const main = async () => {
    try {
        await startScanAgent();
        await startPhotosAgent();
        await connectAllRoots();

        logger.info('starting server');
        await start();
        logger.info('boot');
    } catch (err) {
        logger.error('main', err as Error);
        process.exit(1);
    }
};

main();
