import { listTokens } from './listTokens';

export const listTypeSizeTokens = (family: string): [string, string][] =>
    listTokens(`--${family}-type-size`);
