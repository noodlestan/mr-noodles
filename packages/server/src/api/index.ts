import { startPhotosAgent } from '../agents/photos';
import { startScanAgent } from '../agents/scanner';
import { connect } from '../db';
import { createLogger } from '../logger';

import { start } from './app';

const logger = createLogger('server/api');

const main = async () => {
    try {
        await connect();
        await startScanAgent();
        await startPhotosAgent();
        await start();
        logger.info('boot');
    } catch (err) {
        logger.error('main', err as Error);
        process.exit(1);
    }
};

main();
