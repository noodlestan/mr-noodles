import { PhotoData } from '@noodlestan/shared-types';
import { createEventBus } from '@solid-primitives/event-bus';
import { Accessor, createEffect, createSignal } from 'solid-js';

import { GalleryNavigationContextState } from './private/GalleryNavigationContext';
import {
    handleCloseModal,
    handleGoToNextItem,
    handleGoToPreviousItem,
    handleOnClick,
    handleOnEnd,
    handleOnFocus,
} from './private/eventHandlers';
import { GalleryNavigationEvent } from './types';

export const createGalleryNavigationContext = (
    photos: Accessor<PhotoData[]>,
): GalleryNavigationContextState => {
    const bus = createEventBus<GalleryNavigationEvent>();
    const [isModal, setIsModal] = createSignal<boolean>(false);
    const [current, setCurrent] = createSignal<PhotoData | undefined>();

    createEffect(() => {
        // TODO reset Navigation and current
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

    const context = { bus, isModal, previous, current, next };

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
        }
    });

    return context;
};
