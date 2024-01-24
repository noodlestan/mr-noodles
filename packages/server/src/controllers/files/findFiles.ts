import { basename, dirname } from 'path';

import {
    FileFilter,
    FileNoodle,
    IPagination,
    ISort,
    MediaFileNoodle,
} from '@noodlestan/shared-types';

import { findNoodles } from '../../noodles';
import { matchDateRange } from '../../noodles/functions/matchDateRange';
import { matchPattern } from '../../noodles/functions/matchPattern';

export function findFiles<T extends MediaFileNoodle>(
    filterBy: FileFilter,
    sort?: ISort[],
    page?: IPagination,
): T[] {
    const { root, owner, filename, folder, title, dateFrom, dateUntil } = filterBy;

    const filter = (n: FileNoodle) => {
        if (n.type !== 'file') {
            return false;
        }
        if (root !== undefined && n.root !== root) {
            return false;
        }
        if (owner !== undefined && n.owner !== owner) {
            return false;
        }
        if (!matchPattern(basename(n.filename), filename)) {
            return false;
        }
        if (folder !== undefined && dirname(n.filename) !== folder) {
            return false;
        }
        if (!matchPattern(n.title, title)) {
            return false;
        }
        if (!matchDateRange(n.dateCreated, dateFrom, dateUntil)) {
            return false;
        }

        // TODO implement via findMediaFiles()
        // import { matchEquals } from '../../noodles/functions/matchEquals';
        // import { matchValueRange } from '../../noodles/functions/matchValueRange';
        // if (!matchPattern(dirname(n.mediaType), mediaType)) {
        //     return false;
        // }
        // if (!matchDateRange(n.dateTaken, dateFrom, dateUntil)) {
        //     return false;
        // }
        // if (!matchEquals(n.orientation, orientation)) {
        //     return false;
        // }
        // if (!matchValueRange(n.width, minSize, maxSize)) {
        //     return false;
        // }
        // if (!matchValueRange(n.height, minSize, maxSize)) {
        //     return false;
        // }
        return true;
    };

    return findNoodles<T>(filter, sort, page);
}
