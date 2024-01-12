import { startPhotosAgent } from '../agents/photos';
import { startScanAgent } from '../agents/scanner';
import { connect } from '../db';
import { logger } from '../logger';

import { start } from './app';

const main = async () => {
    try {
        await connect();
        await startScanAgent();
        await startPhotosAgent();
        await start();
        logger.info('BOOT');
    } catch (err) {
        logger.error('BOOT', err);
    }
};

main();
