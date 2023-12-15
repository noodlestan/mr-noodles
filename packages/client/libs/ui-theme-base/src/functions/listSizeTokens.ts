import { useToken, useTokensContext } from '@noodlestan/ui-tokens';

import type { TokenSource } from '../types';

export const listSizeTokens = (): TokenSource[] => {
    const { tokens } = useTokensContext();

    const sizes = Object.entries(tokens()).filter(item => item[0].match(/--size-([a-z0-9]+)$/));

    return sizes.map(([token]) => {
        const matches = token.match(/--size-([a-z0-9]+)$/);
        if (!matches) {
            throw new Error(`Unknown size token "${token}".`);
        }

        const size = matches[1];
        const value = useToken(token, true);

        return {
            name: `--size-${size}`,
            token: [value, token, useToken(token)],
        } as TokenSource;
    });
};
