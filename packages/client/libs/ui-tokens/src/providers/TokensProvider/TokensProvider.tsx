import { Component, JSX, createContext, createMemo, useContext } from 'solid-js';

import { getToken } from '../../private/functions/getToken';
import { TokenMap } from '../../types';

type TokensProviderProps = {
    tokens: TokenMap;
    children?: JSX.Element;
};

type TokensContextState = {
    tokens: () => TokenMap;
};

const TokensContext = createContext<TokensContextState>({
    tokens: () => ({}),
});

export const useTokensContext = (): TokensContextState => useContext(TokensContext);

export const useToken = (name: string, resolve: boolean = false): string => {
    const { tokens } = useTokensContext();
    return getToken(tokens(), name, resolve);
};

export const TokensProvider: Component<TokensProviderProps> = props => {
    const { tokens: parentTokens } = useTokensContext();

    const tokens = createMemo(() => ({
        ...parentTokens,
        ...props.tokens,
    }));

    return <TokensContext.Provider value={{ tokens }}>{props.children}</TokensContext.Provider>;
};
