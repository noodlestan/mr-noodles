import { Router } from 'express';

import { getAll } from './getAll';
import { getPhoto } from './getPhoto';
import { getPhotoImage } from './getPhotoImage';
import { getRecent } from './getRecent';

const router = Router();
router.get('/', getAll);
router.get('/recent', getRecent);

router.get('/:id', getPhoto);
router.get('/:id/img', getPhotoImage);

export { router as photosRouter };
