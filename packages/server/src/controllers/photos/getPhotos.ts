import { IPagination, ISort, PhotoFilter, PhotoSchema } from '@noodlestan/shared-types';
import { FilterQuery, QueryOptions } from 'mongoose';

import type { PhotoDocument } from '../../models/photo';
import { Photo } from '../../models/photo';
import { MongoSort } from '../../models/types';
import {
    pushEqualsFilter,
    pushGreaterThanFilter,
    pushLowerThanFilter,
    pushPatternFilter,
    pushRangeFilter,
} from '../functions';

export const getPhotos = async (
    filterBy: PhotoFilter,
    page?: IPagination,
    sort?: ISort[],
): Promise<PhotoDocument[]> => {
    const $and: FilterQuery<PhotoDocument>[] = [];

    const {
        filename,
        album,
        title,
        dateFrom,
        dateUntil,
        orientation,
        minSize,
        maxSize,
        aspectRatio,
    } = filterBy;

    pushPatternFilter($and, 'filename', filename);
    pushEqualsFilter($and, 'album', album);
    pushPatternFilter($and, 'title', title);
    pushRangeFilter($and, 'date', new Date(String(dateFrom)), new Date(String(dateUntil)));
    pushEqualsFilter($and, 'orientation', orientation);
    pushGreaterThanFilter($and, 'width', minSize);
    pushGreaterThanFilter($and, 'height', minSize);
    pushLowerThanFilter($and, 'width', maxSize);
    pushLowerThanFilter($and, 'height', maxSize);
    pushEqualsFilter($and, 'aspectRatio', aspectRatio);

    const limit = page?.size;
    const skip = page ? (page.page - 1) * page.size : 0;

    const s: MongoSort = {};
    sort?.forEach(({ field, dir }) => {
        s[field] = dir === 'desc' ? -1 : 1;
    });

    const options: QueryOptions<PhotoSchema> = {
        skip,
        limit,
        sort: s,
    };

    const filter = $and.length ? { $and } : {};

    return Photo.find(filter, undefined, options);
};
