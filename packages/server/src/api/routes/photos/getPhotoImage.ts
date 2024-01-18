import {
    PhotoModel,
    selectImageByProfile,
    selectProfileByHeight,
    selectProfileByName,
} from '@noodlestan/shared-types';
import { NextFunction, Request, Response } from 'express';

import { addImageToPhoto } from '../../../controllers/photos/addImageToPhoto';
import { getNoodleById, noodleExists } from '../../../noodles';
import { GALLERY_IMAGE_PROFILES } from '../../../services/images/constants';
import { imageFileExists } from '../../../services/images/imageFileExists';
import { makeImage } from '../../../services/images/makeImage';
import { readImageFile } from '../../../services/images/readImageFile';
import { notFoundHandler } from '../responses';

export const getPhotoImage = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        if (!noodleExists(req.params.id)) {
            notFoundHandler(req, res, next);
            return;
        }
        const photo = getNoodleById<PhotoModel>(req.params.id);

        const height = Number(req.query.h);
        const profileName = String(req.query.p);
        const profile =
            selectProfileByName(GALLERY_IMAGE_PROFILES, profileName) ||
            selectProfileByHeight(GALLERY_IMAGE_PROFILES, height);

        const imageFile = selectImageByProfile(photo.images, profile);
        const exists = imageFile && (await imageFileExists(imageFile.f));
        if (photo.images && exists) {
            const image = await readImageFile(imageFile.f);
            res.setHeader('content-type', 'image/jpg');
            res.send(image);
            return;
        }

        const image = await makeImage(photo.filename, photo.id, profile);
        await addImageToPhoto(photo.id, image);

        const imageData = await readImageFile(image.f);
        res.setHeader('content-type', 'image/jpg');
        res.send(imageData);
    } catch (error) {
        next(error);
    }
};
