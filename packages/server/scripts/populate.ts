import { readFile } from 'fs/promises';
import { resolve } from 'path';

import { connect, disconnect } from '../src/db';
import { createLogger } from '../src/logger';

const DATA_FILE = resolve('../../../resources/example-data/users.json');

const logger = createLogger('scripts/populate');

const main = async () => {
    try {
        await connect();
        logger.info('boot');

        const buffer = await readFile(DATA_FILE);
        const data = JSON.parse(buffer.toString());

        console.info(data);

        logger.info('shutting down');
        await disconnect();
    } catch (err) {
        logger.error('main', err as Error);
        process.exit(1);
    }
};

main();
