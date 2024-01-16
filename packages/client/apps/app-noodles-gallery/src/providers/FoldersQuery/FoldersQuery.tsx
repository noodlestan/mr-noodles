import { Accessor, Component, JSX, createContext, useContext } from 'solid-js';

export type QueryContext = {
    parent: Accessor<string | undefined>;
    setParent: (parent?: string) => undefined;
    searchTerms: Accessor<string | undefined>;
    setSearchTerms: (searchTerms?: string) => undefined;
};

export type FoldersQueryContextState = {
    context: QueryContext;
};

export const FoldersQueryContext = createContext<FoldersQueryContextState>({
    context: {
        parent: () => '',
        setParent: () => undefined,
        searchTerms: () => '',
        setSearchTerms: () => undefined,
    },
});

type FoldersQueryProviderProps = FoldersQueryContextState & {
    children?: JSX.Element;
};

export const FoldersQueryProvider: Component<FoldersQueryProviderProps> = props => {
    return (
        <FoldersQueryContext.Provider value={props}>{props.children} </FoldersQueryContext.Provider>
    );
};

export const useFoldersQueryContext = (): QueryContext => useContext(FoldersQueryContext).context;
