import { TokensError } from '../../errors';

export const placeholderTokenName = (name: string, token: string): string => {
    const match = name.match(/\(([a-z0-9-]+)\)/);
    if (!match) {
        throw new TokensError(`Could not resolve var "${name}" for token "${token}"`);
    }
    return match[1];
};
