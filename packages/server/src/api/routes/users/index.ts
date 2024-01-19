import { Router } from 'express';

import { deleteUserRoot } from './deleteUserRoot';
import { getUser } from './getUser';
import { getUserImage } from './getUserImage';
import { getAll } from './getUsers';
import { postUserRoot } from './postUserRoot';
import { putUserRoot } from './putUserRoot';

const router = Router();
router.get('/', getAll);

router.get('/:id', getUser);
router.get('/:id/img', getUserImage);
router.post('/:id/roots', postUserRoot);
router.put('/:id/roots/:root', putUserRoot);
router.delete('/:id/roots/:root', deleteUserRoot);

export { router as usersRouter };
