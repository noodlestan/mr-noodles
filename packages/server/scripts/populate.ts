import { copyFile, mkdir, readFile } from 'fs/promises';
import { join, resolve } from 'path';

import type { UserNoodle } from '@noodlestan/shared-types';
import { createUser, mappers } from '@noodlestan/shared-types';
import md5 from 'md5';

import { NOODLES_DB_PATH } from '../src/env';
import { createLogger } from '../src/logger';
import { addNoodle, connect, disconnect } from '../src/noodles';

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
        const root = await connect(NOODLES_DB_PATH, mappers);
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
            const user = data[key] as UserNoodle;
            const { name } = user;
            const avatarTarget = join(NOODLES_DB_PATH, 'avatars', `${name}.jpg`);

            const filename = join(NOODLES_DB_PATH, 'users', `${name}`);
            const roots = user.roots?.map(root => {
                return {
                    date: new Date(),
                    id: md5(`${root.name}${Math.random()}`),
                    name: root.name,
                    path: resolve(join('../../', root.path)),
                };
            });

            const data_ = {
                ...user,
                filename,
                avatar: avatarTarget,
                roots,
            };
            const noodle = createUser(data_, root);
            await addNoodle(noodle);

            // const exists = findNoodleByFilename(filename);
            // if (exists) {
            //     const updated = { ...exists, roots };
            //     await updateNoodle(updated);
            // }
        }

        await disconnect();
    } catch (err) {
        logger.error('main', err as Error);
        process.exit(1);
    }
};

main();
