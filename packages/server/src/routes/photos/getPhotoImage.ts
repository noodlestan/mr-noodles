import { selectImageByProfile, selectProfileByHeight } from '@noodlestan/shared-types';
import { NextFunction, Request, Response } from 'express';

import { getPhotoById } from '../../controllers/photos/getPhotoById';
import { Photo } from '../../models/photo';
import { IMAGE_PROFILES } from '../../services/images/constants';
import { imageFileExists } from '../../services/images/imageFileExists';
import { makeImage } from '../../services/images/makeImage';
import { readImageFile } from '../../services/images/readImageFile';
import { notFoundHandler } from '../responses';

export const getPhotoImage = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const photo = await getPhotoById(req.params.id);
        if (!photo) {
            notFoundHandler(req, res, next);
            return;
        }

        const height = Number(req.query.h);
        const profile = selectProfileByHeight(IMAGE_PROFILES, height);

        const imageFile = selectImageByProfile(photo.images, profile);
        const exists = imageFile && (await imageFileExists(imageFile.f));
        if (photo.images && exists) {
            const image = await readImageFile(imageFile.f);
            res.setHeader('content-type', 'image/jpg');
            res.send(image);
            return;
        }

        const image = await makeImage(photo.filename, photo.id, profile);
        await Photo.addImageToPhoto(photo.id, image);

        const imageData = await readImageFile(image.f);
        res.setHeader('content-type', 'image/jpg');
        res.send(imageData);
    } catch (error) {
        next(error);
    }
};
