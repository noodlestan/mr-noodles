import { Router } from 'express';

import { getAll } from './getAll';
import { getPhoto } from './getPhoto';
import { getPhotoThumb } from './getPhotoThumb';
import { getRecent } from './getRecent';

const router = Router();
router.get('/', getAll);
router.get('/recent', getRecent);

router.get('/:id', getPhoto);
router.get('/:id/thumb', getPhotoThumb);

export { router as photosRouter };
