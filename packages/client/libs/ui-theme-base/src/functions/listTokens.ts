import { useTokensContext } from '@noodlestan/ui-tokens';

export const listTokens = (filter?: string): [string, string][] => {
    const { tokens } = useTokensContext();
    return Object.entries(tokens()).filter(item => (filter ? item[0].startsWith(filter) : true));
};
