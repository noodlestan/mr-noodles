import { Component } from 'solid-js';

import { GallerySelectionContext, ModalProviderProps } from './GallerySelectionContext';

export const GallerySelectionProvider: Component<ModalProviderProps> = props => {
    return (
        <GallerySelectionContext.Provider value={props}>
            {props.children}{' '}
        </GallerySelectionContext.Provider>
    );
};
