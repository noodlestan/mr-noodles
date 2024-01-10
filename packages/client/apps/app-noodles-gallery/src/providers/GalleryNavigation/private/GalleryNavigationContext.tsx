import { PhotoData } from '@noodlestan/shared-types';
import { EventBus, createEventBus } from '@solid-primitives/event-bus';
import { Accessor, JSX, createContext } from 'solid-js';

import { GalleryNavigationEvent } from '../types';

export type GalleryNavigationContextState = {
    bus: EventBus<GalleryNavigationEvent>;
    isModal: Accessor<boolean>;
    previous: Accessor<PhotoData | undefined>;
    current: Accessor<PhotoData | undefined>;
    next: Accessor<PhotoData | undefined>;
};

export const GalleryNavigationContext = createContext<GalleryNavigationContextState>({
    bus: createEventBus<GalleryNavigationEvent>(),
    isModal: () => false,
    previous: () => undefined,
    current: () => undefined,
    next: () => undefined,
});

export type ProviderProps = GalleryNavigationContextState & {
    children?: JSX.Element;
};
