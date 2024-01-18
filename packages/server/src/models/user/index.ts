import { UserData, UserModel } from '@noodlestan/shared-types';

import { mapImagesToEndpointUrls } from '../../services/images/mapImagesToEndpointUrls';
import { generateId } from '../generateId';

export const userToData = (doc: UserModel): UserData => {
    const { id, images, dateCreated, dateUpdated, dateCitizen, ...rest } = doc;
    return {
        id,
        ...rest,
        dateCreated: dateCreated.toISOString(),
        dateUpdated: dateUpdated ? dateUpdated.toISOString() : undefined,
        dateCitizen: dateCitizen ? dateCitizen.toISOString() : undefined,
        images: images && mapImagesToEndpointUrls(images),
    };
};

export const userFromData = (partial: Partial<UserData>): UserModel => {
    const { type, filename, dateCreated, dateUpdated, citizen, dateCitizen, ...rest } = partial;
    if ((type && type !== 'user') || filename === undefined) {
        throw new Error('Invalid arguments');
    }

    return {
        id: generateId(filename),
        type: 'user',
        filename,
        dateCreated: dateCreated ? new Date(dateCreated) : new Date(),
        dateUpdated: dateUpdated ? new Date(dateUpdated) : undefined,
        citizen: !!citizen,
        dateCitizen: dateCitizen ? new Date(dateCitizen) : undefined,
        ...rest,
    };
};
