import { EventBus } from '@solid-primitives/event-bus';
import { Accessor } from 'solid-js';

export type SystemUIEventType = 'setColourScheme';

export type SystemUIEvent = {
    name: SystemUIEventType;
    value?: string;
};

export type SystemUIContextState = {
    bus: EventBus<SystemUIEvent>;
    colourScheme: Accessor<string>;
};
