import { createEventBus } from '@solid-primitives/event-bus';
import { createEffect, createSignal } from 'solid-js';

import { makeEventListener } from '../makeEventListener';

import { GallerySelectionContextState, GallerySelectionEvent } from './types';

export const createGallerySelectionContext = (): GallerySelectionContextState => {
    const bus = createEventBus<GallerySelectionEvent>();
    const [selection, setSelection] = createSignal<Set<string>>(new Set());

    createEffect(() => {
        // TODO reset selection and current
    });

    const context = { bus, selection };

    const handleOnSelect = (ev: GallerySelectionEvent): void => {
        const { value: id = '' } = ev;
        if (!id) {
            return;
        }
        const items = context.selection();
        if (items.has(id)) {
            setSelection(prev => {
                const next = new Set(prev);
                next.delete(id);
                return next;
            });
        } else {
            setSelection(prev => {
                const next = new Set(prev);
                next.add(id);
                return next;
            });
        }
    };

    bus.listen(
        makeEventListener<GallerySelectionEvent>({
            onSelect: handleOnSelect,
            clearSelection: () => setSelection(new Set<string>()),
        }),
    );

    return context;
};
