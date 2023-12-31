import { PhotoData } from '@noodlestan/shared-types';
import { Accessor, Setter } from 'solid-js';

import { SelectionContext } from '../createSelectionContext';
import { GallerySelectionEvent } from '../types';

export const handleOnSelect = (
    context: SelectionContext,
    evt: GallerySelectionEvent,
    setSelection: Setter<Set<string>>,
): void => {
    const { target: id = '' } = evt;
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

export const handleClearSelection = (
    context: SelectionContext,
    evt: GallerySelectionEvent,
    setSelection: Setter<Set<string>>,
): void => {
    setSelection(new Set<string>());
};

export const handleOnClick = (
    context: SelectionContext,
    evt: GallerySelectionEvent,
    setCurrent: Setter<PhotoData | undefined>,
    setIsModal: Setter<boolean>,
): void => {
    setIsModal(true);
};

export const handleOnFocus = (
    context: SelectionContext,
    evt: GallerySelectionEvent,
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
    context: SelectionContext,
    evt: GallerySelectionEvent,
    isModal: Accessor<boolean>,
    setIsModal: Setter<boolean>,
): void => {
    if (isModal()) {
        setIsModal(false);
    }
};

export const handleGoToNextItem = (
    context: SelectionContext,
    evt: GallerySelectionEvent,
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
    context: SelectionContext,
    evt: GallerySelectionEvent,
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
    context: SelectionContext,
    evt: GallerySelectionEvent,
    setIsModal: Setter<boolean>,
): void => {
    const { isModal } = context;
    if (isModal()) {
        setIsModal(false);
    }
};
