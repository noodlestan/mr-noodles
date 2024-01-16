import { PhotoModel } from '@noodlestan/shared-types';
import { EventBus } from '@solid-primitives/event-bus';
import { Accessor } from 'solid-js';

export type GalleryNavigationEventType =
    | 'onItemsFocus'
    | 'onItemsBlur'
    | 'onFocus'
    | 'onClick'
    | 'setFocus'
    | 'goToPreviousItem'
    | 'goToNextItem'
    | 'onEnd'
    | 'closeModal';

export type GalleryNavigationEvent = {
    name: GalleryNavigationEventType;
    value?: string;
};

export type GalleryNavigationContextState = {
    bus: EventBus<GalleryNavigationEvent>;
    isModal: Accessor<boolean>;
    previous: Accessor<PhotoModel | undefined>;
    current: Accessor<PhotoModel | undefined>;
    next: Accessor<PhotoModel | undefined>;
};
