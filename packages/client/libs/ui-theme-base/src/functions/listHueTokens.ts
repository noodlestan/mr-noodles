import { listTokens } from './listTokens';

export const listHueTokens = (): string[] => {
    const swatchTokens = listTokens('--color-sw');
    return swatchTokens.filter(([name]) => name.endsWith('-h')).map(hue => hue[0]);
};
