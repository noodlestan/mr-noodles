import { Router } from 'express';

import { makeMeta } from '../../../apm';

const router = Router();

router.get('/', async (req, res) => {
    const m = await makeMeta();
    res.json(m);
});

export { router as metaRouter };
