import { existsSync } from 'fs';
import { readdir, rename } from 'fs/promises';
import { basename, parse, resolve } from 'path';

import { readExif } from '../src/agents/files/utils/readExif';
import { dateFromExifDate } from '../src/controllers/files/functions/dateFromExifDate';
import { SCAN_EXTENSIONS } from '../src/env';

const SOURCE = '/mnt/data/Noodlestan/Andre/Photos New';
// const extensions = [...SCAN_EXTENSIONS, '.mp4', '.mpeg', '.mpg', '.avi', '.m4v', '.mov'];

type FilenameParts = {
    date: Date | undefined;
    index: number;
};

type Item = {
    filename: string;
    index: number;
    date: Date;
};

type Rename = {
    filename: string;
    destination: string;
};

const getFiles = async (dir: string): Promise<string[]> => {
    const dirents = await readdir(dir, { withFileTypes: true });
    const files: (string | string[])[] = await Promise.all(
        dirents.map(dirent => {
            const res = resolve(dir, dirent.name);
            return dirent.isDirectory() ? getFiles(res) : res;
        }),
    );
    return files.flatMap(f => f);
};

const getDateFromExif = async (filename: string): Promise<Date | undefined> => {
    const { ext } = parse(filename);
    if (SCAN_EXTENSIONS.includes(ext.toLowerCase())) {
        const exif = await readExif(filename);
        const date = exif && dateFromExifDate(exif);
        return date;
    }
};

const getPartsFromFilename = (filename: string): FilenameParts => {
    const { dir, base } = parse(filename);
    const match0 = base.match(
        // eslint-disable-next-line security/detect-unsafe-regex
        /(\d{4})-(\d{2})-(\d{2}) (\d{2})-(\d{2})-(\d{2})( \+[\d]+)?(-image|-video)/,
    );
    const match1 = base.match(
        /(img-|image-|video-)(\d{4})-(\d{2})-(\d{2})_(\d{2})-(\d{2})-(\d{2})/,
    );
    const match2 = base.match(/(IMG|VID)(\d{4})(\d{2})(\d{2})(\d{2})(\d{2})(\d{2})/);
    const match3 = base.match(/(VID_)(\d{4})(\d{2})(\d{2})_(\d{2})(\d{2})(\d{2})/);
    const match4 = basename(dir).match(/^(\d{4})-(\d{2})-(\d{2})\s/);
    // eslint-disable-next-line no-undef-init
    let d: Date | undefined = undefined;
    let i: number = 0;
    if (match0) {
        d = new Date(
            `${match0[1]}-${match0[2]}-${match0[3]}T${match0[4]}:${match0[5]}:${match0[6]}Z`,
        );
        i = match0[7] ? Number(match0[7]) : 0;
    } else if (match1) {
        d = new Date(
            `${match1[2]}-${match1[3]}-${match1[4]}T${match1[5]}:${match1[6]}:${match1[7]}Z`,
        );
    } else if (match2) {
        d = new Date(
            `${match2[2]}-${match2[3]}-${match2[4]}T${match2[5]}:${match2[6]}:${match2[7]}Z`,
        );
    } else if (match3) {
        d = new Date(
            `${match3[2]}-${match3[3]}-${match3[4]}T${match3[5]}:${match3[6]}:${match3[7]}Z`,
        );
    } else if (match4) {
        d = new Date(`${match4[1]}-${match4[2]}-${match4[3]}T00:00:00Z`);
    }

    if (d !== undefined && isNaN(d.valueOf())) {
        throw new Error('@@');
    }
    if (isNaN(i)) {
        throw new Error('@@!!');
    }
    return { date: d, index: i };
};

const detectDate = async (filename: string): Promise<Item> => {
    try {
        const date1 = await getDateFromExif(filename);
        const { date: date2, index } = getPartsFromFilename(filename);

        return { filename, date: (date1 || date2) as Date, index };
    } catch (err) {
        console.error(filename);
        console.error(err);
        process.exit();
    }
};

async function series<T>(functions: Array<() => Promise<T>>): Promise<T[]> {
    const results: T[] = [];
    for (let ix = 0; ix < functions.length; ix++) {
        const r = await functions[ix]();
        results.push(r);
    }

    return results;
}

const main = async () => {
    const allFiles = await getFiles(SOURCE);

    const detectDatePromises = allFiles.map(file => () => detectDate(file));

    console.info('detectDate waiting');

    const filesAndDates = await series(detectDatePromises);

    console.info('detectDate done');

    const noDate = filesAndDates.find(fd => !fd.date);
    if (noDate) {
        console.error('no date on these files:');
        console.error(noDate);
        process.exit();
    }

    const renames: Rename[] = filesAndDates.map(file => {
        const { filename, date, index } = file;
        const { dir, ext } = parse(filename);

        const name = date.toISOString().replaceAll(':', '-').replace('.000Z', '').replace('T', ' ');
        const repeat = index ? ` +${index}` : '';
        const sufix = SCAN_EXTENSIONS.includes(ext.toLowerCase()) ? '-image' : '-video';

        const tagMatches = name.match(/\+([\w\s]+)/i);
        const tag = tagMatches ? '+' + tagMatches[1].trim() : '';
        if (tagMatches) {
            console.info(tagMatches);
            process.exit();
        }

        const destination = dir + '/' + name + repeat + sufix + tag + ext.toLowerCase();

        return {
            filename,
            destination,
        };
    });

    const map = {} as Record<string, Rename>;
    const { count } = renames.reduce(
        (acc, item) => {
            const key = item.destination;
            if (acc.map[key]) {
                console.info('duplicate', item.destination);
                console.info(acc.map[key].filename);
                console.info(item.filename);
                acc.count++;
            } else {
                acc.map[key] = item;
            }
            return acc;
        },
        { map, count: 0 },
    );

    if (count) {
        console.info('duplicates found');
        process.exit();
    }

    const renamePromises = renames.map(({ filename, destination }) => async () => {
        if (filename !== destination) {
            console.info('renaming', basename(destination));
            const exists = existsSync(destination);
            if (exists) {
                throw new Error('Shoot! exists!' + destination);
            }
            await rename(filename, destination);
        }
    });

    await series(renamePromises);

    console.info('done');
};

main();
