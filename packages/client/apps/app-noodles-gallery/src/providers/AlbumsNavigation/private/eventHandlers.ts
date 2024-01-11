import { AlbumData } from '@noodlestan/shared-types';
import { Accessor, Setter } from 'solid-js';

import { AlbumsNavigationEvent } from '../types';

import { AlbumsNavigationContextState } from './AlbumsNavigationContext';

export const handleShowAllItems = (
    context: AlbumsNavigationContextState,
    evt: AlbumsNavigationEvent,
    setShowAllItems: Setter<boolean>,
): void => {
    setShowAllItems(true);
};

export const handleShowSubFolders = (
    context: AlbumsNavigationContextState,
    evt: AlbumsNavigationEvent,
    setShowAllItems: Setter<boolean>,
): void => {
    setShowAllItems(false);
};

export const handleOnClick = (
    context: AlbumsNavigationContextState,
    evt: AlbumsNavigationEvent,
    setCurrent: Setter<AlbumData | undefined>,
    setIsModal: Setter<boolean>,
): void => {
    setIsModal(true);
};

export const handleOnFocus = (
    context: AlbumsNavigationContextState,
    evt: AlbumsNavigationEvent,
    photos: Accessor<AlbumData[]>,
    setCurrent: Setter<AlbumData | undefined>,
): void => {
    const { target: id = '' } = evt;
    const items = photos();
    const index = items.findIndex(photo => photo.id === id);
    const newCurrent = items[index];
    setCurrent(newCurrent);
};

export const handleOnEnd = (
    context: AlbumsNavigationContextState,
    evt: AlbumsNavigationEvent,
    isModal: Accessor<boolean>,
    setIsModal: Setter<boolean>,
): void => {
    if (isModal()) {
        setIsModal(false);
    }
};

export const handleGoToNextItem = (
    context: AlbumsNavigationContextState,
    evt: AlbumsNavigationEvent,
    photos: Accessor<AlbumData[]>,
    setCurrent: Setter<AlbumData | undefined>,
): void => {
    const items = photos();
    const index = items.findIndex(photo => photo.id === context.current()?.id);
    const newCurrent = items[index + 1];
    if (newCurrent) {
        setCurrent(newCurrent);
    } else {
        context.bus.emit({ name: 'onEnd' });
    }
};

export const handleGoToPreviousItem = (
    context: AlbumsNavigationContextState,
    evt: AlbumsNavigationEvent,
    photos: Accessor<AlbumData[]>,
    setCurrent: Setter<AlbumData | undefined>,
): void => {
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
export const handleCloseModal = (
    context: AlbumsNavigationContextState,
    evt: AlbumsNavigationEvent,
    setIsModal: Setter<boolean>,
): void => {
    const { isModal } = context;
    if (isModal()) {
        setIsModal(false);
    }
};
