import { Component } from 'solid-js';

import { GalleryNavigationContext, ProviderProps } from './GalleryNavigationContext';

export const GalleryNavigationProvider: Component<ProviderProps> = props => {
    return (
        <GalleryNavigationContext.Provider value={props}>
            {props.children}{' '}
        </GalleryNavigationContext.Provider>
    );
};
