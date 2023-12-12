import { Router } from 'express';

import { getAlbum } from './getAlbum';
import { getAlbumThumb } from './getAlbumThumb';
import { getAll } from './getAll';

const router = Router();
router.get('/', getAll);

router.get('/:id', getAlbum);
router.get('/:id/thumb', getAlbumThumb);

export { router as albumsRouter };
