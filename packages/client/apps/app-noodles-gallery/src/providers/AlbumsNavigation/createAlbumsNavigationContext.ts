import { AlbumData } from '@noodlestan/shared-types';
import { createEventBus } from '@solid-primitives/event-bus';
import { Accessor, createEffect, createSignal } from 'solid-js';

import { AlbumsNavigationContextState } from './private/AlbumsNavigationContext';
import {
    handleCloseModal,
    handleGoToNextItem,
    handleGoToPreviousItem,
    handleOnClick,
    handleOnEnd,
    handleOnFocus,
    handleShowAllItems,
    handleShowSubFolders,
} from './private/eventHandlers';
import { AlbumsNavigationEvent } from './types';

export const createAlbumsNavigationContext = (
    folders: Accessor<AlbumData[]>,
): AlbumsNavigationContextState => {
    const bus = createEventBus<AlbumsNavigationEvent>();
    const [showAllItems, setShowAllItems] = createSignal<boolean>(false);
    const [isModal, setIsModal] = createSignal<boolean>(false);
    const [current, setCurrent] = createSignal<AlbumData | undefined>();

    createEffect(() => {
        // TODO reset Navigation and current
    });

    const previous = () => {
        const items = folders();
        const index = items.findIndex(photo => photo.id === current()?.id);
        return items[index - 1];
    };

    const next = () => {
        const items = folders();
        const index = items.findIndex(photo => photo.id === current()?.id);
        return items[index + 1];
    };

    const context: AlbumsNavigationContextState = {
        bus,
        showAllItems,
        isModal,
        previous,
        current,
        next,
    };

    bus.listen(evt => {
        const { name } = evt;
        switch (name) {
            case 'showAllItems':
                return handleShowAllItems(context, evt, setShowAllItems);
            case 'showSubFolders':
                return handleShowSubFolders(context, evt, setShowAllItems);
            case 'closeModal':
                return handleCloseModal(context, evt, setIsModal);
            case 'goToPreviousItem':
                return handleGoToPreviousItem(context, evt, folders, setCurrent);
            case 'goToNextItem':
                return handleGoToNextItem(context, evt, folders, setCurrent);
            case 'onEnd':
                return handleOnEnd(context, evt, isModal, setIsModal);
            case 'onFocus':
                return handleOnFocus(context, evt, folders, setCurrent);
            case 'onClick':
                return handleOnClick(context, evt, setCurrent, setIsModal);
        }
    });

    return context;
};
