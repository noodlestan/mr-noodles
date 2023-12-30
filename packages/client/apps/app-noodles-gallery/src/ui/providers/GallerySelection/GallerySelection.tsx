import { createEventBus } from '@solid-primitives/event-bus';
import { Component, JSX, createContext, useContext } from 'solid-js';

import { SelectionContext } from '@/ui/services/GallerySelection/createSelectionContext';
import { GallerySelectionEvent } from '@/ui/services/GallerySelection/types';

export type GallerySelectionContextState = {
    context: SelectionContext;
};

export const GallerySelectionContext = createContext<GallerySelectionContextState>({
    context: {
        bus: createEventBus<GallerySelectionEvent>(),
        selection: () => new Set<string>(),
        isModal: () => false,
        previous: () => undefined,
        current: () => undefined,
        next: () => undefined,
    },
});

type ModalProviderProps = GallerySelectionContextState & {
    children?: JSX.Element;
};

export const GallerySelectionProvider: Component<ModalProviderProps> = props => {
    return (
        <GallerySelectionContext.Provider value={props}>
            {props.children}{' '}
        </GallerySelectionContext.Provider>
    );
};

export const useGallerySelectionContext = (): SelectionContext =>
    useContext(GallerySelectionContext).context;
