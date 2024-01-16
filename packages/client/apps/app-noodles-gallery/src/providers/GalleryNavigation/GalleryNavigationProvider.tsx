import { Component, JSX } from 'solid-js';

import { GalleryNavigationContext } from './private/GalleryNavigationContext';
import { GalleryNavigationContextState } from './types';

type ProviderProps = GalleryNavigationContextState & {
    children?: JSX.Element;
};

export const GalleryNavigationProvider: Component<ProviderProps> = props => {
    return (
        <GalleryNavigationContext.Provider value={props}>
            {props.children}{' '}
        </GalleryNavigationContext.Provider>
    );
};
