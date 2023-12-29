import { PhotoData } from '@noodlestan/shared-types';
import { Accessor, Setter } from 'solid-js';

import { SelectionContext } from './private/busEventHandlers';
import { GallerySelectionEvent } from './types';

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

export const handleOnClick = (
    context: SelectionContext,
    evt: GallerySelectionEvent,
    setCurrent: Setter<string | undefined>,
    setIsModal: Setter<boolean>,
    setSelection: Setter<Set<string>>,
): void => {
    const { target: id = '' } = evt;
    const items = context.selection();
    setCurrent(id);
    if (items.size < 1) {
        setIsModal(true);
    } else if (id) {
        setSelection(prev => {
            const next = new Set(prev);
            next.add(id);
            return next;
        });
    }
};

export const handleOnFocus = (
    context: SelectionContext,
    evt: GallerySelectionEvent,
    photos: Accessor<PhotoData[]>,
    setCurrent: Setter<string | undefined>,
): void => {
    const { target: id = '' } = evt;
    const items = photos();
    const index = items.findIndex(photo => photo.id === id);
    const newCurrent = items[index];
    setCurrent(newCurrent?.id);
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
    setCurrent: Setter<string | undefined>,
): void => {
    const items = photos();
    const index = items.findIndex(photo => photo.id === context.current());
    const newCurrent = items[index + 1];
    if (newCurrent) {
        setCurrent(newCurrent.id);
    } else {
        context.bus.emit({ name: 'onEnd' });
    }
};

export const handleGoToPreviousItem = (
    context: SelectionContext,
    evt: GallerySelectionEvent,
    photos: Accessor<PhotoData[]>,
    setCurrent: Setter<string | undefined>,
): void => {
    const items = photos();
    const index = items.findIndex(photo => photo.id === context.current());
    const newCurrent = items[index - 1];
    if (newCurrent) {
        setCurrent(newCurrent.id);
    } else {
        context.bus.emit({ name: 'onEnd' });
    }
};
