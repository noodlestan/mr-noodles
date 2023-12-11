import { startPhotosAgent } from './agents/photos';
import { startScanAgent } from './agents/scanner';
import { start } from './app';
import { connect } from './db';
import { SCAN_NOW } from './env';
import { logger } from './logger';

const main = async () => {
    try {
        await connect();
        await startPhotosAgent();
        if (SCAN_NOW) {
            await startScanAgent();
        }
        await start();
        logger.info('boot');
    } catch (err) {
        logger.error('boot', err);
    }
};

main();
