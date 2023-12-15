import { useTokensContext } from '@noodlestan/ui-tokens';

import { FontFamilySource } from '../types';

export const listTypeFamilies = (): FontFamilySource[] => {
    const { tokens } = useTokensContext();

    const families = Object.entries(tokens()).filter(item => item[0].endsWith('-family'));

    return families.map(([token, value]) => {
        const matches = token.match(/--([a-z]+)-/);
        if (!matches) {
            throw new Error(`Could not parse font family token "${token}".`);
        }
        return {
            name: matches[1],
            token,
            value,
        };
    });
};
