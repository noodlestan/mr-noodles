import { exportRoot } from '@noodlestan/shared-types';
import { Router } from 'express';

import { makeMeta } from '../../../apm';
import { dbRoots } from '../../../noodles';

const router = Router();

router.get('/', async (req, res) => {
    const m = await makeMeta();
    res.json(m);
});

router.get('/roots', async (req, res) => {
    const roots = [...dbRoots().values()];
    res.json({ results: roots.map(exportRoot) });
});

export { router as metaRouter };
