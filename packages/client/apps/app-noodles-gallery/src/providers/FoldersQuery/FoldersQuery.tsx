import { Accessor, Component, JSX, createContext, useContext } from 'solid-js';

import { FoldersQueryContextState } from './types';

export type QueryContext = {
    root: Accessor<string | undefined>;
    setRoot: (root?: string) => undefined;
    parent: Accessor<string | undefined>;
    setParent: (parent?: string) => undefined;
    searchTerms: Accessor<string | undefined>;
    setSearchTerms: (searchTerms?: string) => undefined;
};

export const FoldersQueryContext = createContext<FoldersQueryContextState>(
    {} as FoldersQueryContextState,
);

type FoldersQueryProviderProps = FoldersQueryContextState & {
    children?: JSX.Element;
};

export const FoldersQueryProvider: Component<FoldersQueryProviderProps> = props => {
    return (
        <FoldersQueryContext.Provider value={props}>{props.children} </FoldersQueryContext.Provider>
    );
};

export const useFoldersQueryContext = (): FoldersQueryContextState =>
    useContext(FoldersQueryContext);
