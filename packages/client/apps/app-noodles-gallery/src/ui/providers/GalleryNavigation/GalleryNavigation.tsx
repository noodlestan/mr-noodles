import { PhotoData } from '@noodlestan/shared-types';
import { EventBus, createEventBus } from '@solid-primitives/event-bus';
import { Accessor, Component, JSX, createContext, useContext } from 'solid-js';

import { GalleryNavigationEvent } from '@/ui/services/GalleryNavigation/types';

export type NavigationContext = {
    bus: EventBus<GalleryNavigationEvent>;
    isModal: Accessor<boolean>;
    previous: Accessor<PhotoData | undefined>;
    current: Accessor<PhotoData | undefined>;
    next: Accessor<PhotoData | undefined>;
};

export type GalleryNavigationContextState = {
    context: NavigationContext;
};

export const GalleryNavigationContext = createContext<GalleryNavigationContextState>({
    context: {
        bus: createEventBus<GalleryNavigationEvent>(),
        isModal: () => false,
        previous: () => undefined,
        current: () => undefined,
        next: () => undefined,
    },
});

type ModalProviderProps = GalleryNavigationContextState & {
    children?: JSX.Element;
};

export const GalleryNavigationProvider: Component<ModalProviderProps> = props => {
    return (
        <GalleryNavigationContext.Provider value={props}>
            {props.children}{' '}
        </GalleryNavigationContext.Provider>
    );
};

export const useGalleryNavigationContext = (): NavigationContext =>
    useContext(GalleryNavigationContext).context;
