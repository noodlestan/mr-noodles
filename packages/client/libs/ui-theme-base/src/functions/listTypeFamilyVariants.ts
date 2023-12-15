import { useToken } from '@noodlestan/ui-tokens';

import type { FontFamilyVariant } from '../types';

import { listTypeSizeTokens } from './listTypeSizeTokens';

export const listTypeFamilyVariants = (family: string): FontFamilyVariant[] => {
    const sizeTokens = listTypeSizeTokens(family);
    const heightToken = `--${family}-type-height-base`;
    const height = useToken(heightToken, true);

    return sizeTokens.reverse().map(([token]) => {
        const variant = token.split('-').pop();
        const weightToken = `--${family}-type-weight-${variant}`;

        const size = useToken(token, true);
        const weight = useToken(weightToken, true);

        return {
            name: `${family}-${variant}`,
            height: [height, heightToken, useToken(heightToken)],
            size: [size, token, useToken(token)],
            weight: [weight, weightToken, useToken(weightToken)],
        };
    });
};
