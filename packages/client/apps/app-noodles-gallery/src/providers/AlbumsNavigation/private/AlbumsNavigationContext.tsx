import { AlbumData } from '@noodlestan/shared-types';
import { EventBus, createEventBus } from '@solid-primitives/event-bus';
import { Accessor, JSX, createContext } from 'solid-js';

import { AlbumsNavigationEvent } from '../types';

export type AlbumsNavigationContextState = {
    bus: EventBus<AlbumsNavigationEvent>;
    showAllItems: Accessor<boolean>;
    isModal: Accessor<boolean>;
    previous: Accessor<AlbumData | undefined>;
    current: Accessor<AlbumData | undefined>;
    next: Accessor<AlbumData | undefined>;
};

export const AlbumsNavigationContext = createContext<AlbumsNavigationContextState>({
    bus: createEventBus<AlbumsNavigationEvent>(),
    showAllItems: () => false,
    isModal: () => false,
    previous: () => undefined,
    current: () => undefined,
    next: () => undefined,
});

export type ModalProviderProps = AlbumsNavigationContextState & {
    children?: JSX.Element;
};
