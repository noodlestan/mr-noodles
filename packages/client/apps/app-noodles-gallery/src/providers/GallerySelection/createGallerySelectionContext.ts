import { createEventBus } from '@solid-primitives/event-bus';
import { createEffect, createSignal } from 'solid-js';

import { GallerySelectionContextState } from './private/GallerySelectionContext';
import { handleClearSelection, handleOnSelect } from './private/eventHandlers';
import { GallerySelectionEvent } from './types';

export const createGallerySelectionContext = (): GallerySelectionContextState => {
    const bus = createEventBus<GallerySelectionEvent>();
    const [selection, setSelection] = createSignal<Set<string>>(new Set());

    createEffect(() => {
        // TODO reset selection and current
    });

    const context = { bus, selection };

    bus.listen(evt => {
        const { name } = evt;
        switch (name) {
            case 'onSelect':
                return handleOnSelect(context, evt, setSelection);
            case 'clearSelection':
                return handleClearSelection(context, evt, setSelection);
        }
    });

    return context;
};
