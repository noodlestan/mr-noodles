import { basename, dirname } from 'path';

import { IPagination, ISort, PhotoFilter, PhotoModel } from '@noodlestan/shared-types';

import { findNoodles } from '../../noodles';
import { matchDateRange } from '../../noodles/functions/matchDateRange';
import { matchEquals } from '../../noodles/functions/matchEquals';
import { matchPattern } from '../../noodles/functions/matchPattern';
import { matchValueRange } from '../../noodles/functions/matchValueRange';

export const findPhotos = (
    filterBy: PhotoFilter,
    sort?: ISort[],
    page?: IPagination,
): PhotoModel[] => {
    const { filename, folder, title, dateFrom, dateUntil, orientation, minSize, maxSize } =
        filterBy;

    const filter = (n: PhotoModel) => {
        if (n.type !== 'photo') {
            return false;
        }
        if (!matchPattern(basename(n.filename), filename)) {
            return false;
        }
        if (!matchPattern(dirname(n.filename), folder)) {
            return false;
        }
        if (!matchPattern(n.title, title)) {
            return false;
        }
        if (!matchDateRange(n.dateTaken, dateFrom, dateUntil)) {
            return false;
        }
        if (!matchEquals(n.orientation, orientation)) {
            return false;
        }
        if (!matchValueRange(n.width, minSize, maxSize)) {
            return false;
        }
        if (!matchValueRange(n.height, minSize, maxSize)) {
            return false;
        }
        return true;
    };

    return findNoodles<PhotoModel>(filter, sort, page);
};
