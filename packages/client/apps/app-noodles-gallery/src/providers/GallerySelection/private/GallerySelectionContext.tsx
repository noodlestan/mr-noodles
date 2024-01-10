import { EventBus, createEventBus } from '@solid-primitives/event-bus';
import { Accessor, JSX, createContext } from 'solid-js';

import { GallerySelectionEvent } from '../types';

export type GallerySelectionContextState = {
    bus: EventBus<GallerySelectionEvent>;
    selection: Accessor<Set<string>>;
};

export const GallerySelectionContext = createContext<GallerySelectionContextState>({
    bus: createEventBus<GallerySelectionEvent>(),
    selection: () => new Set<string>(),
});

export type ModalProviderProps = GallerySelectionContextState & {
    children?: JSX.Element;
};
