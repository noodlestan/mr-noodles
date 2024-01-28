import { startFilesAgent } from './agents/files';
import { startScanAgent } from './agents/scanner';
import { start } from './api/app';
import { connectAllRoots } from './db';
import { createLogger } from './logger';

const logger = createLogger('server/api');

const main = async () => {
    try {
        await startScanAgent();
        await startFilesAgent();
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
