import { Router } from 'express';

import { getFile } from './getFile';
import { getFileImage } from './getFileImage';
import { getFiles } from './getFiles';
import { getRecent } from './getRecent';

const router = Router();
router.get('/', getFiles);
router.get('/recent', getRecent);

router.get('/:id', getFile);
router.get('/:id/img', getFileImage);

export { router as filesRouter };
