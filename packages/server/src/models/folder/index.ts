/* eslint-disable @typescript-eslint/no-use-before-define */
import { FolderData, FolderModel } from '@noodlestan/shared-types';

import { mapImagesToEndpointUrls } from '../../services/images/mapImagesToEndpointUrls';
import { generateId } from '../generateId';

export const folderToData = (doc: FolderModel): FolderData => {
    const { id, images, dateCreated, dateUpdated, dateFrom, dateUntil, ...rest } = doc;
    return {
        id,
        ...rest,
        dateCreated: dateCreated.toISOString(),
        dateUpdated: dateUpdated ? dateUpdated.toISOString() : undefined,
        dateFrom: dateFrom ? dateFrom.toISOString() : undefined,
        dateUntil: dateUntil ? dateUntil.toISOString() : undefined,
        images: images && mapImagesToEndpointUrls(images),
    };
};

export const folderFromData = (partial: Partial<FolderData>): FolderModel => {
    const {
        id,
        type,
        filename,
        dateCreated,
        dateUpdated,
        dateFrom,
        dateUntil,

        ...rest
    } = partial;
    if ((type && type !== 'folder') || filename === undefined) {
        throw new Error('Invalid arguments');
    }

    return {
        id: id || generateId(filename),
        type: 'folder',
        filename,
        dateCreated: dateCreated ? new Date(dateCreated) : new Date(),
        dateUpdated: dateUpdated ? new Date(dateUpdated) : undefined,
        dateFrom: dateFrom ? new Date(dateFrom) : undefined,
        dateUntil: dateUntil ? new Date(dateUntil) : undefined,
        ...rest,
    };
};
