import { Router } from 'express';

import { getAlbum } from './getAlbum';
import { getAlbumImage } from './getAlbumImage';
import { getAll } from './getAll';

const router = Router();
router.get('/', getAll);

router.get('/:id', getAlbum);
router.get('/:id/img', getAlbumImage);

export { router as albumsRouter };
