import { useToken, useTokensContext } from '@noodlestan/ui-tokens';

import type { TokenSource } from '../types';

export const listGapTokens = (): TokenSource[] => {
    const { tokens } = useTokensContext();

    const gaps = Object.entries(tokens()).filter(item => item[0].match(/--space-gap-([a-z0-9]+)$/));

    return gaps.map(([token]) => {
        const matches = token.match(/--space-gap-([a-z0-9]+)$/);
        if (!matches) {
            throw new Error(`Unknown gap token "${token}".`);
        }

        const gap = matches[1];
        const value = useToken(token, true);

        return {
            name: `--space-gap-${gap}`,
            token: [value, token, useToken(token)],
        } as TokenSource;
    });
};
