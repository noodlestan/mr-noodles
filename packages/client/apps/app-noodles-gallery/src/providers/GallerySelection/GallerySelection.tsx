import { EventBus, createEventBus } from '@solid-primitives/event-bus';
import { Accessor, Component, JSX, createContext, useContext } from 'solid-js';

import { GallerySelectionEvent } from '@/services/GallerySelection/types';

export type SelectionContext = {
    bus: EventBus<GallerySelectionEvent>;
    selection: Accessor<Set<string>>;
};

export type GallerySelectionContextState = {
    context: SelectionContext;
};

export const GallerySelectionContext = createContext<GallerySelectionContextState>({
    context: {
        bus: createEventBus<GallerySelectionEvent>(),
        selection: () => new Set<string>(),
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
