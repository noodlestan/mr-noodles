import { filesAgentQueue, startFilesAgent, stopFilesAgent } from '../src/agents/files';
import { startScanAgent, stopScanAgent } from '../src/agents/scanner';
import { connectAllRoots, disconnect } from '../src/db';
import { createLogger } from '../src/logger';
import { defer } from '../src/utils/flow/defer';

const logger = createLogger('scripts/scan');

const shutdown = async () => {
    logger.info('shutting down');
    await disconnect();
    await stopFilesAgent();
    await stopScanAgent();
};

const monitor = async () => {
    const queue = filesAgentQueue();

    while (queue.length()) {
        await defer(() => undefined, 1000);
    }

    await defer(shutdown, 1000);
};

const main = async () => {
    try {
        await startFilesAgent();
        await startScanAgent();
        await connectAllRoots(true);
        logger.info('boot');
        await defer(monitor, 1000);
        logger.info('done');
    } catch (err) {
        logger.error('main', err as Error);
        process.exit(1);
    }
};

main();
