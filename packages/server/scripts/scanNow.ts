import { photosAgentQueue, startPhotosAgent, stopPhotosAgent } from '../src/agents/photos';
import { startScanAgent, stopScanAgent } from '../src/agents/scanner';
import { scanNow } from '../src/agents/scanner/functions/scanNow';
import { connect, disconnect } from '../src/db';
import { logger } from '../src/logger';
import { defer } from '../src/utils/flow/defer';

const shutdown = async () => {
    logger.info('shutting down');
    await disconnect();
    await stopPhotosAgent();
    await stopScanAgent();
    process.exit();
};

const monitor = async () => {
    const queue = photosAgentQueue();

    while (queue.length()) {
        await defer(() => undefined, 1000);
    }

    await defer(shutdown, 1000);
};

const main = async () => {
    await connect();
    await startPhotosAgent();
    await startScanAgent();
    logger.info('BOOT');
    await scanNow();
    logger.info('DONE');
    await defer(monitor, 1000);
};

main();
