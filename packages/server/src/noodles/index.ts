import { mkdir, readFile, unlink, writeFile } from 'fs/promises';
import { dirname } from 'path';

import { IPagination, ISort, UserFolder } from '@noodlestan/shared-types';
import { queue as CreateQueue, QueueObject } from 'async';

import { createFolderFromDirname } from '../controllers/folders/createFolderFromDirname';
import { NOODLES_DB_EXT } from '../env';
import { subscribe } from '../events';
import { EVENT_SCAN_DIR, EVENT_SCAN_FILE_DATA, EventScanDir, EventScanFile } from '../events/scan';
import { log } from '../logger';

import { canWriteToPath } from './private/functions/canWriteToPath';
import { dataFilename } from './private/functions/dataFilename';
import { findRoot } from './private/functions/findRoot';
import { scanRoot } from './private/functions/scanRoot';
import { sortNoodles } from './private/functions/sortNoodles';
import { validateOp } from './private/functions/validateOp';
import { Mappers, Noodle, Noodles, Root, Roots } from './types';

const roots: Roots = new Map();
const noodles: Noodles = new Map();
const mappers: Mappers = [];
const unsubscribeTo: Array<() => void> = [];

if (!NOODLES_DB_EXT) {
    throw new Error(`Invalid env var NOODLES_DB_EXT: "${NOODLES_DB_EXT}"`);
}

const processDataFile = async (event: EventScanFile): Promise<void> => {
    let mapperName: string = '';

    try {
        const buffer = await readFile(event.filename);
        const data = JSON.parse(buffer.toString());

        const mapper = mappers.find(({ match }) => match(data));
        if (!mapper) {
            throw new Error(`Unprocessable noodle "${JSON.stringify(data)}"`);
        }
        mapperName = mapper?.name;
        const noodle = mapper.map(data);
        noodles.set(noodle.id, noodle);
    } catch (err) {
        const message = (err as Error).message;
        throw new Error(
            `invalid data file "${event.filename}". Mapper "${mapperName}". Reason: "${message}"`,
        );
    }
};

const processDir = async (event: EventScanDir): Promise<void> => {
    await createFolderFromDirname(event.dirname);
};

const dataQueue = CreateQueue<EventScanFile | EventScanDir>(async (event, next) => {
    if ((event as EventScanDir).dirname) {
        await processDir(event as EventScanDir);
    } else {
        await processDataFile(event as EventScanFile);
    }
    next();
}, 10);

const addRoot = async (root: Root): Promise<void> => {
    const { path, name, owner, system } = root;
    log().info('noodlesaddRoot', { path, name, owner, system });
    if (roots.get(path)) {
        throw new Error(`noodlesaddRoot:duplicate root path "${root.path}"`);
    }
    if (system && !canWriteToPath(path)) {
        throw new Error(`noodlesaddRoot:can not write to "${root.path}"`);
    }
    try {
        findRoot(roots, path);
    } catch (err) {
        if (!(err as Error).message.match('noodlesfindRoot:no root match for')) {
            throw err;
        }
    }
    roots.set(path, root);
    await scanRoot(root, processDataFile);
};

const addUserFolder = async (userFolder: UserFolder, userId: string): Promise<void> => {
    const { path, name } = userFolder;

    log().info('noodlesaddUserFolder', { path, name, userId });

    const root = {
        path,
        name,
        owner: userId,
    };
    await addRoot(root);
};

const addNoodle = async (noodle: Noodle): Promise<void> => {
    const { filename } = noodle;
    validateOp(roots, noodle);

    const dataFile = dataFilename(noodle, filename);
    await mkdir(dirname(dataFile), { recursive: true });
    await writeFile(dataFile, JSON.stringify(noodle));
    noodles.set(noodle.id, noodle);

    log().debug('noodlesaddNoodle', { filename, dataFile });
};

const updateNoodle = async (noodle: Noodle): Promise<void> => {
    const { filename } = noodle;
    validateOp(roots, noodle);

    const dataFile = dataFilename(noodle, filename);
    await mkdir(dirname(dataFile), { recursive: true });
    await writeFile(dataFile, JSON.stringify(noodle));
    noodles.set(noodle.id, noodle);

    log().debug('noodlesupdateNoodle', { filename, dataFile });
};

const deleteNoodle = async (noodle: Noodle): Promise<void> => {
    const { filename } = noodle;
    validateOp(roots, noodle);

    const dataFile = dataFilename(noodle, filename);
    await unlink(dataFile);

    noodles.delete(filename);
    log().debug('noodlesdeleteNoodle', { filename, dataFile });
};

const noodleExists = (id: string): boolean => {
    return !!noodles.has(id);
};

function getNoodleById<T extends Noodle>(id: string): T {
    const noodle = noodles.get(id) as T;

    if (!noodle) {
        throw new Error(`Unknown noodle id ${id}`);
    }
    return noodle;
}

function findNoodles<T extends Noodle>(
    filterFn: (n: T) => boolean,
    sort?: ISort[],
    page?: IPagination,
): T[] {
    const limit = page?.size;
    const skip = page ? (page.page - 1) * page.size : 0;
    const values = [...noodles.values()] as T[];
    const filtered = values.filter(filterFn);
    const sorted = sort ? sortNoodles(filtered, sort) : filtered;
    const sliced = limit ? sorted.slice(skip, limit + skip) : sorted;
    return sliced;
}

function findNoodle<T extends Noodle>(filterFn: (n: T) => boolean): T | undefined {
    const values = [...noodles.values()] as T[];
    return values.find(filterFn);
}

const connect = async (path: string, _mappers: Mappers): Promise<void> => {
    const scanFileUnsub = subscribe<EventScanFile>(EVENT_SCAN_FILE_DATA, event => {
        dataQueue.push(event);
    });
    unsubscribeTo.push(scanFileUnsub);

    const scanDirUnsub = subscribe<EventScanDir>(EVENT_SCAN_DIR, event => {
        dataQueue.push(event);
    });
    unsubscribeTo.push(scanDirUnsub);

    _mappers.forEach(mapper => mappers.push(mapper));
    await addRoot({ path, name: 'MrNoodles', system: true });
    log().info('noodlesconnect');
};

const disconnect = async (): Promise<void> => {
    unsubscribeTo.forEach(unsub => unsub());
    log().info('noodlesdisconnected');
};

const dbQueue = (): QueueObject<EventScanFile | EventScanDir> => {
    return dataQueue;
};

const dbRoots = (): Roots => {
    return roots;
};

export {
    addRoot,
    addUserFolder,
    addNoodle,
    updateNoodle,
    deleteNoodle,
    noodleExists,
    getNoodleById,
    findNoodle,
    findNoodles,
    connect,
    disconnect,
    dbQueue,
    dbRoots,
};
