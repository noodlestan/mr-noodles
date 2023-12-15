import { TokenMap } from '@noodlestan/ui-tokens';

import { base } from './base';
import { color } from './invert/color';
import { surfaces as lightSurfaces } from './invert/surfaces';

const global: TokenMap = {
    ...color,
};

export const invert = {
    global: { ...base.global, ...global },
    surfaces: {
        ...base.surfaces,
        inverse: {
            ...base.surfaces.inverse,
            ...lightSurfaces.inverse,
        },
    },
};
