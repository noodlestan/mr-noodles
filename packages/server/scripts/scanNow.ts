import { photosAgentQueue, startPhotosAgent, stopPhotosAgent } from '../src/agents/photos';
import { startScanAgent, stopScanAgent } from '../src/agents/scanner';
import { connectAllRoots, disconnect } from '../src/db';
import { createLogger } from '../src/logger';
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
        await connectAllRoots();
        logger.info('boot');
        await defer(monitor, 1000);
        logger.info('done');
    } catch (err) {
        logger.error('main', err as Error);
        process.exit(1);
    }
};

main();
