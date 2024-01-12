import {
    selectImageByProfile,
    selectProfileByHeight,
    selectProfileByName,
} from '@noodlestan/shared-types';
import { NextFunction, Request, Response } from 'express';

import { findUserById } from '../../../controllers/users/findUserById';
import { User } from '../../../models/user';
import { GALLERY_IMAGE_PROFILES } from '../../../services/images/constants';
import { imageFileExists } from '../../../services/images/imageFileExists';
import { makeImage } from '../../../services/images/makeImage';
import { readImageFile } from '../../../services/images/readImageFile';
import { notFoundHandler } from '../responses';

export const getUserImage = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const user = await findUserById(req.params.id);
        if (!user) {
            notFoundHandler(req, res, next);
            return;
        }

        const height = Number(req.query.h);
        const profileName = String(req.query.p);
        const profile =
            selectProfileByName(GALLERY_IMAGE_PROFILES, profileName) ||
            selectProfileByHeight(GALLERY_IMAGE_PROFILES, height);

        const imageFile = selectImageByProfile(user.images, profile);
        const exists = imageFile && (await imageFileExists(imageFile.f));
        if (user.images && exists) {
            const image = await readImageFile(imageFile.f);
            res.setHeader('content-type', 'image/jpg');
            res.send(image);
            return;
        }

        const image = await makeImage(user.name || '', user.id, profile);
        await User.addImageToUser(user.id, image);

        const imageData = await readImageFile(image.f);
        res.setHeader('content-type', 'image/jpg');
        res.send(imageData);
    } catch (error) {
        next(error);
    }
};
