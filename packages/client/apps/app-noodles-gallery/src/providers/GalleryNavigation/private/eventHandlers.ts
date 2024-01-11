import { PhotoData } from '@noodlestan/shared-types';
import { Accessor, Setter } from 'solid-js';

import { GalleryNavigationEvent } from '../types';

import { GalleryNavigationContextState } from './GalleryNavigationContext';

export const handleOnClick = (
    context: GalleryNavigationContextState,
    evt: GalleryNavigationEvent,
    setCurrent: Setter<PhotoData | undefined>,
    setIsModal: Setter<boolean>,
): void => {
    setIsModal(true);
};

export const handleOnFocus = (
    context: GalleryNavigationContextState,
    evt: GalleryNavigationEvent,
    photos: Accessor<PhotoData[]>,
    setCurrent: Setter<PhotoData | undefined>,
): void => {
    const { target: id = '' } = evt;
    const items = photos();
    const index = items.findIndex(photo => photo.id === id);
    const newCurrent = items[index];
    setCurrent(newCurrent);
};

export const handleOnEnd = (
    context: GalleryNavigationContextState,
    evt: GalleryNavigationEvent,
    isModal: Accessor<boolean>,
    setIsModal: Setter<boolean>,
): void => {
    if (isModal()) {
        setIsModal(false);
    }
};

export const handleGoToNextItem = (
    context: GalleryNavigationContextState,
    evt: GalleryNavigationEvent,
    photos: Accessor<PhotoData[]>,
    setCurrent: Setter<PhotoData | undefined>,
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
    context: GalleryNavigationContextState,
    evt: GalleryNavigationEvent,
    photos: Accessor<PhotoData[]>,
    setCurrent: Setter<PhotoData | undefined>,
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
    context: GalleryNavigationContextState,
    evt: GalleryNavigationEvent,
    setIsModal: Setter<boolean>,
): void => {
    const { isModal } = context;
    if (isModal()) {
        setIsModal(false);
    }
};
