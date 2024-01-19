import { cp } from 'fs/promises';
import { join, resolve } from 'path';

import { PUBLIC_ASSETS_DIR } from '../src/env';
import { createLogger } from '../src/logger';

const logger = createLogger('scripts/copyStaticAssets');

const RESOURCES = resolve('../../resources/static');

const main = async () => {
    const source = join(RESOURCES, 'media');
    const target = join(PUBLIC_ASSETS_DIR, 'media');
    await cp(source, target, { recursive: true });

    logger.info('done');
};

main();
