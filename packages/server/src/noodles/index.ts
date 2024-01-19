import { mkdir, readFile, unlink, writeFile } from 'fs/promises';
import { dirname } from 'path';

import type {
    IPagination,
    ISort,
    Mapper,
    Noodle,
    Noodles,
    Root,
    Roots,
    UserRoot,
} from '@noodlestan/shared-types';
import { queue as CreateQueue, QueueObject } from 'async';

import { createFolderFromDirname } from '../controllers/folders/createFolderFromDirname';
import { NOODLES_DB_EXT } from '../env';
import { subscribe } from '../events';
import { EVENT_SCAN_DATA, EVENT_SCAN_DIR, EventScanDir, EventScanFile } from '../events/scan';
import { log } from '../logger';

import { canWriteToPath } from './private/functions/canWriteToPath';
import { dataFilename } from './private/functions/dataFilename';
import { findRootFromFilename } from './private/functions/findRootFromFilename';
import { scanRoot } from './private/functions/scanRoot';
import { sortNoodles } from './private/functions/sortNoodles';
import { validateOp } from './private/functions/validateOp';

const MR_NOODLES = 'MrNoodles';

const roots: Roots = new Map();
const noodles: Noodles = new Map();
const mappers: Mapper[] = [];
const unsubscribeTo: Array<() => void> = [];

if (!NOODLES_DB_EXT) {
    throw new Error(`Invalid env var NOODLES_DB_EXT: "${NOODLES_DB_EXT}"`);
}

function importNoodle<T extends Noodle>(data: unknown, root: Root): T {
    const mapper = mappers.find(({ match }) => match(data as Noodle));
    if (!mapper) {
        throw new Error(`No importer for noodle "${JSON.stringify(data)}"`);
    }
    const noodle = mapper.import(data) as T;
    if (noodle.root !== root.id) {
        throw new Error(`Unexpected noodle root "${noodle.root}". Expected "${root.id}"`);
    }
    return noodle;
}

function exportNoodle<T extends Noodle>(noodle: T): unknown {
    const mapper = mappers.find(({ match }) => match(noodle));
    if (!mapper) {
        throw new Error(`No exporter for noodle "${JSON.stringify(noodle)}"`);
    }
    return mapper.export(noodle);
}

const processDataFile = async (event: EventScanFile): Promise<void> => {
    let mapperName: string | undefined;

    try {
        const buffer = await readFile(event.filename);
        const data = JSON.parse(buffer.toString());

        mapperName = mappers.find(({ match }) => match(data))?.name;
        const noodle = importNoodle<Noodle>(data, event.root);
        noodles.set(noodle.id, noodle);
    } catch (err) {
        const message = (err as Error).message;
        throw new Error(
            `invalid data file "${event.filename}". Mapper "${mapperName}". Reason: "${message}"`,
        );
    }
};

const processDir = async (event: EventScanDir): Promise<void> => {
    await createFolderFromDirname(event.dirname, event.root);
};

const dataQueue = CreateQueue<EventScanFile | EventScanDir>(async (event, next) => {
    if ((event as EventScanDir).dirname) {
        await processDir(event as EventScanDir);
    } else {
        await processDataFile(event as EventScanFile);
    }
    next();
}, 10);

const removeUserRoot = async (userRoot: UserRoot, userId: string): Promise<void> => {
    const { path } = userRoot;

    roots.delete(path);

    [...noodles.keys()].forEach(id => {
        const noodle = noodles.get(id);
        if (noodle?.root === userRoot.id) {
            noodles.delete(noodle.id);
        }
    });

    log().info('noodles:removeUserRoot', { path, userId });
};

const validateRoot = (root: Root): void => {
    const { path } = root;

    const maybeOtherRoot = findRootFromFilename(roots, path);
    if (maybeOtherRoot && maybeOtherRoot.id !== root.id) {
        throw new Error(
            `noodles:validateRoot:duplicate root path "${path}" is contained by existing root "${maybeOtherRoot.path}"`,
        );
    }

    const wouldContain = [...roots.values()].find(r => r.path.startsWith(path));
    if (wouldContain && wouldContain.id !== root.id) {
        throw new Error(
            `noodles:validateRoot:duplicate root path "${path}" would contain existing root "${wouldContain.path}"`,
        );
    }

    if (!canWriteToPath(path)) {
        throw new Error(`noodles:validateRoot:can not write to "${path}"`);
    }
};

const addRoot = async (root: Root, isHardScan?: boolean): Promise<void> => {
    const { path, name, owner, system } = root;
    log().info('noodles:addRoot', { path, name, owner, system });
    try {
        validateRoot(root);
    } catch (err) {
        if (system) {
            throw err;
        }
    }

    const exists = findRootFromFilename(roots, path);
    const writable = canWriteToPath(path);

    if (exists) {
        log().warn('noodles:addRoot:duplicate root path', { path });
    }

    if (!writable) {
        log().warn('noodles:addRoot:path is not writable', { path });
    }

    if (writable && !exists) {
        roots.set(path, root);
        await scanRoot(root, isHardScan, processDataFile);
    }
};

const addUserRoot = async (
    userRoot: UserRoot,
    userId: string,
    doHardScan?: boolean,
): Promise<void> => {
    const { date, id, path, name } = userRoot;

    log().info('noodles:addUserRoot', { path, name, userId });

    const root = {
        date,
        id,
        path,
        name,
        owner: userId,
    };
    await addRoot(root, doHardScan);
};

const addNoodle = async (noodle: Noodle): Promise<void> => {
    const { filename } = noodle;
    validateOp(roots, noodle);

    if (noodles.has(noodle.id)) {
        throw new Error(`noodles:addNoodle:duplicate noodle id "${noodle.id}"`);
    }

    const dataFile = dataFilename(noodle, filename);
    await mkdir(dirname(dataFile), { recursive: true });
    await writeFile(dataFile, JSON.stringify(noodle));
    noodles.set(noodle.id, noodle);

    log().debug('noodles:addNoodle', { filename, dataFile });
};

const updateNoodle = async (noodle: Noodle): Promise<void> => {
    const { filename } = noodle;
    validateOp(roots, noodle);

    const dataFile = dataFilename(noodle, filename);
    await mkdir(dirname(dataFile), { recursive: true });
    await writeFile(dataFile, JSON.stringify(noodle));
    noodles.set(noodle.id, noodle);

    log().debug('noodles:updateNoodle', { filename, dataFile });
};

const deleteNoodle = async (noodle: Noodle): Promise<void> => {
    const { filename } = noodle;
    validateOp(roots, noodle);

    const dataFile = dataFilename(noodle, filename);
    await unlink(dataFile);

    noodles.delete(filename);
    log().debug('noodles:deleteNoodle', { filename, dataFile });
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

function findNoodleByFilename<T extends Noodle>(filename: string): T | undefined {
    return findNoodle<T>(n => n.filename === filename);
}

const connect = async (path: string, _mappers: Mapper[], doHardScan?: boolean): Promise<Root> => {
    const scanFileUnsub = subscribe<EventScanFile>(EVENT_SCAN_DATA, event => {
        dataQueue.push(event);
    });
    unsubscribeTo.push(scanFileUnsub);

    const scanDirUnsub = subscribe<EventScanDir>(EVENT_SCAN_DIR, event => {
        dataQueue.push(event);
    });
    unsubscribeTo.push(scanDirUnsub);

    _mappers.forEach(mapper => mappers.push(mapper));
    const systemRoot: Root = {
        date: new Date(),
        id: MR_NOODLES,
        path,
        name: MR_NOODLES,
        system: true,
    };
    await addRoot(systemRoot, doHardScan);
    log().info('noodles:connect');
    return systemRoot;
};

const disconnect = async (): Promise<void> => {
    unsubscribeTo.forEach(unsub => unsub());
    log().info('noodles:disconnected');
};

const dbQueue = (): QueueObject<EventScanFile | EventScanDir> => {
    return dataQueue;
};

const dbRoots = (): Roots => {
    return roots;
};

export {
    addRoot,
    validateRoot,
    addUserRoot,
    removeUserRoot,
    addNoodle,
    updateNoodle,
    deleteNoodle,
    noodleExists,
    getNoodleById,
    findNoodles,
    findNoodle,
    findNoodleByFilename,
    exportNoodle,
    connect,
    disconnect,
    dbQueue,
    dbRoots,
};
