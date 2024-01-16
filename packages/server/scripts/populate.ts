import { copyFile, mkdir, readFile } from 'fs/promises';
import { join, resolve } from 'path';

import { UserData } from '@noodlestan/shared-types';

import { addNoodle, connect, disconnect } from '../src/db';
import { NOODLES_DB_PATH } from '../src/env';
import { createLogger } from '../src/logger';
import { mappers } from '../src/models/mappers';
import { userFromData } from '../src/models/user';

const RESOURCES = resolve('../../resources/example-data');
const DATA_FILE = resolve(`${RESOURCES}/users.json`);

const logger = createLogger('scripts/populate');

const Avatars = [
    'Ghost.jpg',
    'MrNoodles.jpg',
    'Andre.jpg',
    'Caetano.jpg',
    'Francisco.jpg',
    'Vanessa.jpg',
];

const main = async () => {
    try {
        await connect(NOODLES_DB_PATH, mappers);
        logger.info('boot');

        await mkdir(join(NOODLES_DB_PATH, 'avatars'), { recursive: true });
        for (const avatar of Avatars) {
            const ghostSource = join(RESOURCES, 'avatars', avatar);
            const ghostTarget = join(NOODLES_DB_PATH, 'avatars', avatar);
            await copyFile(ghostSource, ghostTarget);
        }

        const buffer = await readFile(DATA_FILE);
        const data = JSON.parse(buffer.toString());
        for (const key in data) {
            const user = data[key] as UserData;
            const { name } = user;
            const avatarTarget = join(NOODLES_DB_PATH, 'avatars', `${name}.jpg`);

            const filename = join(NOODLES_DB_PATH, 'users', `${name}`);
            const folders = user.folders?.map(f => resolve(join('../../', f)));

            const noodle = userFromData({ ...user, filename, avatar: avatarTarget, folders });
            await addNoodle(noodle);
        }

        logger.info('shutting down');
        await disconnect();
    } catch (err) {
        logger.error('main', err as Error);
        process.exit(1);
    }
};

main();
