import { Accessor, Component, JSX, createContext, useContext } from 'solid-js';

export type QueryContext = {
    parent: Accessor<string | undefined>;
    setParent: (parent?: string) => undefined;
    searchTerms: Accessor<string | undefined>;
    setSearchTerms: (searchTerms?: string) => undefined;
};

export type AlbumsQueryContextState = {
    context: QueryContext;
};

export const AlbumsQueryContext = createContext<AlbumsQueryContextState>({
    context: {
        parent: () => '',
        setParent: () => undefined,
        searchTerms: () => '',
        setSearchTerms: () => undefined,
    },
});

type ModalProviderProps = AlbumsQueryContextState & {
    children?: JSX.Element;
};

export const AlbumsQueryProvider: Component<ModalProviderProps> = props => {
    return (
        <AlbumsQueryContext.Provider value={props}>{props.children} </AlbumsQueryContext.Provider>
    );
};

export const useAlbumsQueryContext = (): QueryContext => useContext(AlbumsQueryContext).context;
