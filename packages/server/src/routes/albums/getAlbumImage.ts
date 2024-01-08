import {
    selectImageByProfile,
    selectProfileByHeight,
    selectProfileByName,
} from '@noodlestan/shared-types';
import { NextFunction, Request, Response } from 'express';

import { getAlbumById } from '../../controllers/albums/getAlbumById';
import { getPhotoById } from '../../controllers/photos/getPhotoById';
import { Album } from '../../models/album';
import { ALBUM_IMAGE_PROFILES } from '../../services/images/constants';
import { imageFileExists } from '../../services/images/imageFileExists';
import { makeImage } from '../../services/images/makeImage';
import { readImageFile } from '../../services/images/readImageFile';
import { notFoundHandler } from '../responses';

export const getAlbumImage = async (
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> => {
    try {
        const album = await getAlbumById(req.params.id);
        if (!album) {
            notFoundHandler(req, res, next);
            return;
        }

        const height = Number(req.query.h);
        const profileName = String(req.query.p);
        const profile =
            selectProfileByName(ALBUM_IMAGE_PROFILES, profileName) ||
            selectProfileByHeight(ALBUM_IMAGE_PROFILES, height);

        const imageFile = selectImageByProfile(album.images, profile);
        const exists = imageFile && (await imageFileExists(imageFile.f));
        if (album.images && exists) {
            const image = await readImageFile(imageFile.f);
            res.setHeader('content-type', 'image/jpg');
            res.send(image);
            return;
        }

        if (!album.photos.length) {
            notFoundHandler(req, res, next);
            return;
        }

        const photo = await getPhotoById(album.photos[0]);
        if (!photo) {
            notFoundHandler(req, res, next);
            return;
        }

        const image = await makeImage(photo.filename, photo.id, profile);
        await Album.addImageToAlbum(album.id, image);

        const imageData = await readImageFile(image.f);
        res.setHeader('content-type', 'image/jpg');
        res.send(imageData);
    } catch (error) {
        next(error);
    }
};
