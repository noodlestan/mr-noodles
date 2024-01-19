import { Router } from 'express';

import { makeMeta } from '../../../apm';
import { dbRoots } from '../../../noodles';

const router = Router();

router.get('/', async (req, res) => {
    const m = await makeMeta();
    res.json(m);
});

router.get('/roots', async (req, res) => {
    const r = dbRoots();
    res.json([...r.values()]);
});

export { router as metaRouter };
