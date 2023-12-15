import { TokenMap } from '@noodlestan/ui-tokens';

import { color } from './base/color';
import { outline } from './base/outline';
import { radius } from './base/radius';
import { space } from './base/space';
import { surfaces } from './base/surfaces';
import { type } from './base/type';

const global: TokenMap = {
    ...color,
    ...outline,
    ...radius,
    ...space,
    ...type,
};

export const base = {
    global,
    surfaces,
};
