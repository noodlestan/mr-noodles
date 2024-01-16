import { Component, JSX } from 'solid-js';

import { GallerySelectionContext } from './private/GallerySelectionContext';
import { GallerySelectionContextState } from './types';

type GallerySelectionProviderProps = GallerySelectionContextState & {
    children?: JSX.Element;
};

export const GallerySelectionProvider: Component<GallerySelectionProviderProps> = props => {
    return (
        <GallerySelectionContext.Provider value={props}>
            {props.children}{' '}
        </GallerySelectionContext.Provider>
    );
};
