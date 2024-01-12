import { Router } from 'express';

import { getAlbum } from './getAlbum';
import { getAlbumImage } from './getAlbumImage';
import { getAlbums } from './getAlbums';

const router = Router();
router.get('/', getAlbums);

router.get('/:id', getAlbum);
router.get('/:id/img', getAlbumImage);

export { router as albumsRouter };
