import { Router } from 'express';

import { getPhoto } from './getPhoto';
import { getPhotoImage } from './getPhotoImage';
import { getPhotos } from './getPhotos';
import { getRecent } from './getRecent';

const router = Router();
router.get('/', getPhotos);
router.get('/recent', getRecent);

router.get('/:id', getPhoto);
router.get('/:id/img', getPhotoImage);

export { router as photosRouter };
