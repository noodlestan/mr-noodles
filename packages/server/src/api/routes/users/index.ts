import { Router } from 'express';

import { getUser } from './getUser';
import { getUserImage } from './getUserImage';
import { getAll } from './getUsers';

const router = Router();
router.get('/', getAll);

router.get('/:id', getUser);
router.get('/:id/img', getUserImage);

export { router as usersRouter };
