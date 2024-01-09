import { AlbumData } from '@noodlestan/shared-types';
import { EventBus, createEventBus } from '@solid-primitives/event-bus';
import { Accessor, Component, JSX, createContext, useContext } from 'solid-js';

import { AlbumsNavigationEvent } from '@/ui/services/AlbumsNavigation/types';

export type NavigationContext = {
    bus: EventBus<AlbumsNavigationEvent>;
    showAllItems: Accessor<boolean>;
    isModal: Accessor<boolean>;
    previous: Accessor<AlbumData | undefined>;
    current: Accessor<AlbumData | undefined>;
    next: Accessor<AlbumData | undefined>;
};

export type AlbumsNavigationContextState = {
    context: NavigationContext;
};

export const AlbumsNavigationContext = createContext<AlbumsNavigationContextState>({
    context: {
        bus: createEventBus<AlbumsNavigationEvent>(),
        showAllItems: () => false,
        isModal: () => false,
        previous: () => undefined,
        current: () => undefined,
        next: () => undefined,
    },
});

type ModalProviderProps = AlbumsNavigationContextState & {
    children?: JSX.Element;
};

export const AlbumsNavigationProvider: Component<ModalProviderProps> = props => {
    return (
        <AlbumsNavigationContext.Provider value={props}>
            {props.children}{' '}
        </AlbumsNavigationContext.Provider>
    );
};

export const useAlbumsNavigationContext = (): NavigationContext =>
    useContext(AlbumsNavigationContext).context;
