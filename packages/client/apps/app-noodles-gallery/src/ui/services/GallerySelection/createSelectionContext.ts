import { PhotoData } from '@noodlestan/shared-types';
import { EventBus, createEventBus } from '@solid-primitives/event-bus';
import { Accessor, createEffect, createSignal } from 'solid-js';

import {
    handleClearSelection,
    handleCloseModal,
    handleGoToNextItem,
    handleGoToPreviousItem,
    handleOnClick,
    handleOnEnd,
    handleOnFocus,
    handleOnSelect,
} from './private/eventHandlers';
import { GallerySelectionEvent } from './types';

export type SelectionContext = {
    bus: EventBus<GallerySelectionEvent>;
    selection: Accessor<Set<string>>;
    isModal: Accessor<boolean>;
    previous: Accessor<PhotoData | undefined>;
    current: Accessor<PhotoData | undefined>;
    next: Accessor<PhotoData | undefined>;
};

type GallerySelectionService = {
    createSelectionContext: (photos: Accessor<PhotoData[]>) => SelectionContext;
};

const createSelectionContext = (photos: Accessor<PhotoData[]>): SelectionContext => {
    const bus = createEventBus<GallerySelectionEvent>();
    const [selection, setSelection] = createSignal<Set<string>>(new Set());
    const [isModal, setIsModal] = createSignal<boolean>(false);
    const [current, setCurrent] = createSignal<PhotoData | undefined>();

    createEffect(() => {
        // TODO reset selection and current
    });

    const previous = () => {
        const items = photos();
        const index = items.findIndex(photo => photo.id === current()?.id);
        return items[index - 1];
    };

    const next = () => {
        const items = photos();
        const index = items.findIndex(photo => photo.id === current()?.id);
        return items[index + 1];
    };

    const context = { bus, selection, isModal, previous, current, next };

    bus.listen(evt => {
        const { name } = evt;
        switch (name) {
            case 'closeModal':
                return handleCloseModal(context, evt, setIsModal);
            case 'goToPreviousItem':
                return handleGoToPreviousItem(context, evt, photos, setCurrent);
            case 'goToNextItem':
                return handleGoToNextItem(context, evt, photos, setCurrent);
            case 'onEnd':
                return handleOnEnd(context, evt, isModal, setIsModal);
            case 'onFocus':
                return handleOnFocus(context, evt, photos, setCurrent);
            case 'onClick':
                return handleOnClick(context, evt, setCurrent, setIsModal);
            case 'onSelect':
                return handleOnSelect(context, evt, setSelection);
            case 'clearSelection':
                return handleClearSelection(context, evt, setSelection);
        }
    });

    return context;
};

export const createGallerySelectionService = (): GallerySelectionService => {
    return {
        createSelectionContext,
    };
};
