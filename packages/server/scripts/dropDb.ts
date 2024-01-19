import { connectAllRoots } from '../src/db';
import { createLogger } from '../src/logger';
import { dbRoots, disconnect } from '../src/noodles';
import { dropRoot } from '../src/noodles/private/functions/dropRoot';

const logger = createLogger('scripts/dropDb');

const main = async () => {
    try {
        await connectAllRoots();
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
