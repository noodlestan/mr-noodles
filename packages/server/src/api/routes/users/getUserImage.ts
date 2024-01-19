import { join } from 'path';

import type { UserNoodle } from '@noodlestan/shared-types';
import {
    selectImageByProfile,
    selectProfileByHeight,
    selectProfileByName,
} from '@noodlestan/shared-types';
import { NextFunction, Request, Response } from 'express';

import { addImageToUser } from '../../../controllers/users/addImageToUser';
import { PUBLIC_ASSETS_DIR } from '../../../env';
import { getNoodleById, noodleExists } from '../../../noodles';
import { USER_IMAGE_PROFILES } from '../../../services/images/constants';
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
        if (!noodleExists(req.params.id)) {
            notFoundHandler(req, res, next);
            return;
        }

        const user = getNoodleById<UserNoodle>(req.params.id);
        const height = Number(req.query.h);
        const profileName = String(req.query.p);
        const profile =
            selectProfileByName(USER_IMAGE_PROFILES, profileName) ||
            selectProfileByHeight(USER_IMAGE_PROFILES, height);

        const imageFile = selectImageByProfile(user.images, profile);
        const exists = imageFile && (await imageFileExists(imageFile.f));
        if (user.images && exists) {
            const image = await readImageFile(imageFile.f);
            res.setHeader('content-type', 'image/jpg');
            res.send(image);
            return;
        }

        if (!user.avatar) {
            res.redirect(join(PUBLIC_ASSETS_DIR, 'avatar/Ghost.jpg'));
            return;
        }

        const image = await makeImage(user.avatar, user.id, profile);
        await addImageToUser(user.id, image);

        const imageData = await readImageFile(image.f);
        res.setHeader('content-type', 'image/jpg');
        res.send(imageData);
    } catch (error) {
        next(error);
    }
};
