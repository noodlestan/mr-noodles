import { TokenMap } from '../../types';

import { getToken } from './getToken';
import { placeholderTokenName } from './placeholderToken';

export const resolveTokenValue = (
    tokens: TokenMap,
    name: string,
    value: string,
    matches: string[],
): string =>
    matches.reduce((v, match) => {
        const token = placeholderTokenName(match, name);
        return v.replace(match, getToken(tokens, token));
    }, value);
