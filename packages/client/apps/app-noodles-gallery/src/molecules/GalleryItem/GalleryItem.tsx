import type { PhotoData } from '@noodlestan/shared-types';
// import { Text } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Component, createEffect } from 'solid-js';

import { ItemCheckbox } from '@/atoms/ItemCheckbox/ItemCheckbox';
import { useGalleryNavigationContext } from '@/providers/GalleryNavigation';
import { useGallerySelectionContext } from '@/providers/GallerySelection';
import { makeImageUrl } from '@/services/Images/makeImageUrl';

import './GalleryItem.css';

export type GalleryItemProps = {
    item: PhotoData;
};

export const GalleryItem: Component<GalleryItemProps> = props => {
    let buttonRef: HTMLButtonElement | undefined;

    const { bus: navigationBus, isModal, current } = useGalleryNavigationContext();
    const { bus: selectionBus } = useGallerySelectionContext();

    const isCurrent = () => current()?.id === props.item.id;

    const handleOnFocus = () => navigationBus?.emit({ name: 'onFocus', target: props.item.id });
    const handleOnClick = () => {
        if (current()) {
            navigationBus?.emit({ name: 'onClick', target: props.item.id });
        } else {
            selectionBus?.emit({ name: 'onSelect', target: props.item.id });
        }
    };
    const handleOnSelect = () => selectionBus?.emit({ name: 'onSelect', target: props.item.id });
    const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.code === 'Space') {
            ev.preventDefault();
            handleOnSelect();
        } else if (ev.code === 'Enter') {
            handleOnClick();
        }
    };

    createEffect(() => {
        if (!isModal() && isCurrent() && buttonRef) {
            buttonRef.focus();
            buttonRef.scrollIntoView({ block: 'center', behavior: 'instant' });
            // TODO set focus when modal closes
        }
    });

    const url = () => makeImageUrl('photos', props.item, 'thumb.small');
    // TODO abstract
    const date = () => (props.item.date ? new Date(props.item.date).toString() : '');
    const label = () => `Gallery item. ${date()}. Press to open details.`;

    const classList = () => ({
        GalleryItem: true,
        'GalleryItem-is-current': isCurrent(),
    });

    return (
        <Flex gap="m" classList={classList()}>
            <button
                ref={buttonRef}
                tabindex="0"
                class="GalleryItem--button"
                onFocus={handleOnFocus}
                onClick={handleOnClick}
                onKeyDown={handleKeyDown}
                aria-label={label()}
            >
                <ItemCheckbox
                    id={props.item.id}
                    onFocus={handleOnFocus}
                    onKeyDown={handleKeyDown}
                />
                <img alt="" src={url()} />
            </button>
        </Flex>
    );
};
