import { Component } from 'solid-js';

import { AlbumsNavigationContext, ModalProviderProps } from './private/AlbumsNavigationContext';

export const AlbumsNavigationProvider: Component<ModalProviderProps> = props => {
    return (
        <AlbumsNavigationContext.Provider value={props}>
            {props.children}{' '}
        </AlbumsNavigationContext.Provider>
    );
};
