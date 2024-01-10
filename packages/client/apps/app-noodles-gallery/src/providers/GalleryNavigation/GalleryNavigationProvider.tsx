import { Component } from 'solid-js';

import { GalleryNavigationContext, ProviderProps } from './private/GalleryNavigationContext';

export const GalleryNavigationProvider: Component<ProviderProps> = props => {
    return (
        <GalleryNavigationContext.Provider value={props}>
            {props.children}{' '}
        </GalleryNavigationContext.Provider>
    );
};
