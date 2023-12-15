import type { Surface, Theme } from '@noodlestan/ui-themes';

import { base } from './tokens/base';
import { invert } from './tokens/invert';

export const theme: Theme = {
    name: 'base',
    extends: [],
    mode: 'dark',
    tokens: {
        base,
        invert,
    },
};

const stage: Surface = {
    name: 'stage',
    extends: [],
};

const page: Surface = {
    name: 'page',
    extends: ['stage'],
};

const card: Surface = {
    name: 'card',
    extends: ['page'],
};

const banner: Surface = {
    name: 'banner',
    extends: ['page'],
};

const inverse: Surface = {
    name: 'inverse',
    extends: ['stage'],
};

export const surfaces = [stage, page, card, banner, inverse];
