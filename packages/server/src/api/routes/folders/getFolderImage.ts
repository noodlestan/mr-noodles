import { dirname } from 'path';

import {
    FolderModel,
    selectImageByProfile,
    selectProfileByHeight,
    selectProfileByName,
} from '@noodlestan/shared-types';
import { NextFunction, Request, Response } from 'express';

import { addImageToFolder } from '../../../controllers/folders/addImageToFolder';
import { findNoodles, getNoodleById, noodleExists } from '../../../noodles';
import { FOLDER_IMAGE_PROFILES } from '../../../services/images/constants';
import { imageFileExists } from '../../../services/images/imageFileExists';
import { makeImage } from '../../../services/images/makeImage';
import { readImageFile } from '../../../services/images/readImageFile';
import { notFoundHandler } from '../responses';

export const getFolderImage = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        if (!noodleExists(req.params.id)) {
            notFoundHandler(req, res, next);
            return;
        }
        const folder = getNoodleById<FolderModel>(req.params.id);

        const height = Number(req.query.h);
        const profileName = String(req.query.p);
        const profile =
            selectProfileByName(FOLDER_IMAGE_PROFILES, profileName) ||
            selectProfileByHeight(FOLDER_IMAGE_PROFILES, height);

        const imageFile = selectImageByProfile(folder.images, profile);
        const exists = imageFile && (await imageFileExists(imageFile.f));
        if (folder.images && exists) {
            const image = await readImageFile(imageFile.f);
            res.setHeader('content-type', 'image/jpg');
            res.send(image);
            return;
        }

        const photos = findNoodles(n => dirname(n.filename) === folder.filename);

        if (!photos.length) {
            notFoundHandler(req, res, next);
            return;
        }
        const image = await makeImage(photos[0].filename, photos[0].id, profile);
        await addImageToFolder(folder.id, image);

        const imageData = await readImageFile(image.f);
        res.setHeader('content-type', 'image/jpg');
        res.send(imageData);
    } catch (error) {
        next(error);
    }
};
