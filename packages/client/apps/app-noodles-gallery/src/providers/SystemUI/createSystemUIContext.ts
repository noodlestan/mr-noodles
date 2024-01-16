import { createEventBus } from '@solid-primitives/event-bus';
import { makePersisted } from '@solid-primitives/storage';
import { createSignal } from 'solid-js';

import { makeEventListener } from '../makeEventListener';

import { SystemUIContextState, SystemUIEvent } from './types';

export const createSystemUIContext = (): SystemUIContextState => {
    const bus = createEventBus<SystemUIEvent>();

    const [colourScheme, setColourScheme] = makePersisted(createSignal<string>(''));

    const context: SystemUIContextState = {
        bus,
        colourScheme,
    };

    bus.listen(
        makeEventListener<SystemUIEvent>({
            setColourScheme: ev => setColourScheme(ev.value as string),
        }),
    );

    return context;
};
