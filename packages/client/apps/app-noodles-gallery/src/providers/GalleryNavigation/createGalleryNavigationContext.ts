import { PhotoModel } from '@noodlestan/shared-types';
import { createEventBus } from '@solid-primitives/event-bus';
import { Accessor, createEffect, createSignal } from 'solid-js';

import { makeEventListener } from '../makeEventListener';

import { GalleryNavigationContextState, GalleryNavigationEvent } from './types';

export const createGalleryNavigationContext = (
    photos: Accessor<PhotoModel[]>,
): GalleryNavigationContextState => {
    const bus = createEventBus<GalleryNavigationEvent>();
    const [isModal, setIsModal] = createSignal<boolean>(false);
    const [current, setCurrent] = createSignal<PhotoModel | undefined>();

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

    const handleOnFocus = (ev: GalleryNavigationEvent) => {
        const { value: id = '' } = ev;
        const items = photos();
        const index = items.findIndex(photo => photo.id === id);
        const newCurrent = items[index];
        setCurrent(newCurrent);
    };

    const handleOnEnd = () => {
        if (isModal()) {
            setIsModal(false);
        }
    };

    const handleGoToNextItem = () => {
        const items = photos();
        const index = items.findIndex(photo => photo.id === context.current()?.id);
        const newCurrent = items[index + 1];
        if (newCurrent) {
            setCurrent(newCurrent);
        } else {
            context.bus.emit({ name: 'onEnd' });
        }
    };

    const handleGoToPreviousItem = () => {
        const items = photos();
        const index = items.findIndex(photo => photo.id === context.current()?.id);
        const newCurrent = items[index - 1];
        if (newCurrent) {
            setCurrent(newCurrent);
        } else {
            context.bus.emit({ name: 'onEnd' });
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const handleCloseModal = () => {
        const { isModal } = context;
        if (isModal()) {
            setIsModal(false);
        }
    };

    bus.listen(
        makeEventListener<GalleryNavigationEvent>({
            closeModal: handleCloseModal,
            goToPreviousItem: handleGoToPreviousItem,
            goToNextItem: handleGoToNextItem,
            onEnd: handleOnEnd,
            onFocus: ev => handleOnFocus(ev),
            onClick: () => setIsModal(true),
        }),
    );

    return context;
};
