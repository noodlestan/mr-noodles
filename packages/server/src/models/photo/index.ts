import { PhotoData, PhotoModel } from '@noodlestan/shared-types';

import { mapImagesToEndpointUrls } from '../../services/images/mapImagesToEndpointUrls';
import { generateId } from '../generateId';

export const photoToData = (doc: PhotoModel): PhotoData => {
    const { id, images, dateCreated, dateUpdated, dateTaken, ...rest } = doc;
    return {
        id,
        ...rest,
        dateCreated: dateCreated.toISOString(),
        dateUpdated: dateUpdated ? dateUpdated.toISOString() : undefined,
        dateTaken: dateTaken ? dateTaken.toISOString() : undefined,
        images: images && mapImagesToEndpointUrls(images),
    };
};

export const photoFromData = (partial: Partial<PhotoData>): PhotoModel => {
    const {
        type,
        filename,
        dateCreated,
        dateUpdated,
        hash,
        dateTaken,
        orientation,
        width,
        height,
        ...rest
    } = partial;
    if (
        (type && type !== 'photo') ||
        filename === undefined ||
        hash === undefined ||
        orientation === undefined ||
        width === undefined ||
        height === undefined
    ) {
        throw new Error('Invalid arguments');
    }

    return {
        id: generateId(filename),
        type: 'photo',
        filename,
        dateCreated: dateCreated ? new Date(dateCreated) : new Date(),
        dateUpdated: dateUpdated ? new Date(dateUpdated) : undefined,
        hash,
        dateTaken: dateTaken ? new Date(dateTaken) : undefined,
        orientation,
        width,
        height,
        ...rest,
    };
};
