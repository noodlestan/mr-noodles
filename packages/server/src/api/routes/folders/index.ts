import { Router } from 'express';

import { getFolder } from './getFolder';
import { getFolderImage } from './getFolderImage';
import { getFolders } from './getFolders';

const router = Router();
router.get('/', getFolders);

router.get('/:id', getFolder);
router.get('/:id/img', getFolderImage);

export { router as foldersRouter };
