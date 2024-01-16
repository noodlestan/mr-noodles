import { EventBus } from '@solid-primitives/event-bus';
import { Accessor } from 'solid-js';

export type GallerySelectionEventType = 'onSelect' | 'clearSelection';

export type GallerySelectionEvent = {
    name: GallerySelectionEventType;
    value?: string;
};

export type GallerySelectionContextState = {
    bus: EventBus<GallerySelectionEvent>;
    selection: Accessor<Set<string>>;
};
