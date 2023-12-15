import { TokensError } from '../../errors';
import { TokenMap } from '../../types';

import { matchTokenPlaceholders } from './matchPlaceholders';
import { resolveTokenValue } from './resolveTokenValue';

export const getToken = (tokens: TokenMap, name: string, resolve: boolean = false): string => {
    const value = tokens?.[name];

    if (!value) {
        throw new TokensError(`Unknown token ${name}`);
    }

    const matches = matchTokenPlaceholders(value);

    if (resolve && matches?.length) {
        return resolveTokenValue(tokens, name, value, matches);
    }

    return value;
};
