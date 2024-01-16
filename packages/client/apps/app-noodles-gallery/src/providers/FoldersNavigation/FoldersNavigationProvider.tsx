import { Component, JSX } from 'solid-js';

import { FoldersNavigationContext } from './private/FoldersNavigationContext';
import { FoldersNavigationContextState } from './types';

type FoldersNavigationProviderProps = FoldersNavigationContextState & {
    children?: JSX.Element;
};

export const FoldersNavigationProvider: Component<FoldersNavigationProviderProps> = props => {
    return (
        <FoldersNavigationContext.Provider value={props}>
            {props.children}{' '}
        </FoldersNavigationContext.Provider>
    );
};
