import type { FolderNoodle } from '@noodlestan/shared-types';
import { createEventBus } from '@solid-primitives/event-bus';
import { Accessor, createEffect, createSignal } from 'solid-js';

import { makeEventListener } from '../makeEventListener';

import { FoldersNavigationContextState, FoldersNavigationEvent } from './types';

export const createFoldersNavigationContext = (
    folders: Accessor<FolderNoodle[]>,
): FoldersNavigationContextState => {
    const bus = createEventBus<FoldersNavigationEvent>();
    const [showAllItems, setShowAllItems] = createSignal<boolean>(false);
    const [isModal, setIsModal] = createSignal<boolean>(false);
    const [current, setCurrent] = createSignal<FolderNoodle | undefined>();

    createEffect(() => {
        // TODO reset Navigation and current
    });

    const previous = () => {
        const items = folders();
        const index = items.findIndex(folder => folder.id === current()?.id);
        return items[index - 1];
    };

    const next = () => {
        const items = folders();
        const index = items.findIndex(folder => folder.id === current()?.id);
        return items[index + 1];
    };

    const context: FoldersNavigationContextState = {
        bus,
        showAllItems,
        isModal,
        previous,
        current,
        next,
    };

    const handleOnFocus = (ev: FoldersNavigationEvent) => {
        const { value: id = '' } = ev;
        const items = folders();
        const index = items.findIndex(folder => folder.id === id);
        const newCurrent = items[index];
        setCurrent(newCurrent);
    };

    const handleOnEnd = () => {
        if (isModal()) {
            setIsModal(false);
        }
    };

    const handleGoToNextItem = () => {
        const items = folders();
        const index = items.findIndex(folder => folder.id === context.current()?.id);
        const newCurrent = items[index + 1];
        if (newCurrent) {
            setCurrent(newCurrent);
        } else {
            context.bus.emit({ name: 'onEnd' });
        }
    };

    const handleGoToPreviousItem = () => {
        const items = folders();
        const index = items.findIndex(folder => folder.id === context.current()?.id);
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
        makeEventListener<FoldersNavigationEvent>({
            showAllItems: () => setShowAllItems(true),
            showSubFolders: () => setShowAllItems(false),
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
