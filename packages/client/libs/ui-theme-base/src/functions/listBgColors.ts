import { useToken } from '@noodlestan/ui-tokens';

import type { ColorSource } from '../types';

import { hsla } from './hsla';
import { listTokens } from './listTokens';

export const listBgColors = (): ColorSource[] => {
    const lightnessTokens = listTokens('--color-bg-l');
    const fgHueToken = '--color-bg-hue';
    const fgSatToken = '--color-bg-sat';

    return lightnessTokens.map((lightness, index) => {
        const h = useToken(fgHueToken, true);
        const s = useToken(fgSatToken, true);
        const l = useToken(lightness[0], true);

        return {
            name: `fg-${index}`,
            value: hsla(h, s, l),
            h: [h, fgHueToken, useToken(fgHueToken)],
            s: [s, fgSatToken, useToken(fgSatToken)],
            l: [l, lightness[0], useToken(lightness[0])],
        } as ColorSource;
    });
};
