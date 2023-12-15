import { useToken, useTokensContext } from '@noodlestan/ui-tokens';

import type { TokenSource } from '../types';

export const listPaddingTokens = (): TokenSource[] => {
    const { tokens } = useTokensContext();

    const paddings = Object.entries(tokens()).filter(item =>
        item[0].match(/--space-pad-([a-z0-9]+)$/),
    );

    return paddings.map(([token]) => {
        const matches = token.match(/--space-pad-([a-z0-9]+)$/);
        if (!matches) {
            throw new Error(`Unknown padding token "${token}".`);
        }

        const padding = matches[1];
        const value = useToken(token, true);

        return {
            name: `--space-pad-${padding}`,
            token: [value, token, useToken(token)],
        } as TokenSource;
    });
};
