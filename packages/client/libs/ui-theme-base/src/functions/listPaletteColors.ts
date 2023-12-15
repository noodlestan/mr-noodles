import { useToken } from '@noodlestan/ui-tokens';

import type { ColorSource } from '../types';

import { hsla } from './hsla';
import { listTokens } from './listTokens';

export const listPaletteColors = (hueToken: string): ColorSource[] => {
    const swatchTokens = listTokens('--color-sw');
    const lightnessTokens = swatchTokens.filter(([name]) => name.startsWith('--color-light'));
    const palette = hueToken.match(/--color-sw-(\d+)-hue/)?.[1];
    if (!palette) {
        throw new Error(`Invalid palette token "${hueToken}".`);
    }
    const satTokenName = `--color-sw-${palette}-sat`;
    const satToken = swatchTokens.find(([name]) => name === satTokenName);
    if (!satToken) {
        throw new Error(`Saturation token not found "${satTokenName}".`);
    }

    return lightnessTokens.map((lightness, index) => {
        const h = useToken(hueToken, true);
        const s = useToken(satToken[0], true);
        const l = useToken(lightness[0], true);

        return {
            name: `fg-${palette}-${index}`,
            value: hsla(h, s, l),
            h: [h, hueToken, useToken(hueToken)],
            s: [s, satToken[0], useToken(satToken[0])],
            l: [l, lightness[0], useToken(lightness[0])],
        } as ColorSource;
    });
};
