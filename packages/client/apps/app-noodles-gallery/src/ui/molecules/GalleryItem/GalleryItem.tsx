import type { PhotoData } from '@noodlestan/shared-types';
// import { Text } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Component, createEffect } from 'solid-js';

import { makeImageUrl } from '../../services/Images/makeImageUrl';

import { ItemCheckbox } from '@/ui/atoms/ItemCheckbox/ItemCheckbox';
import { useGallerySelectionContext } from '@/ui/providers/GallerySelection/GallerySelection';

import './GalleryItem.css';

export type GalleryItemProps = {
    item: PhotoData;
};

export const GalleryItem: Component<GalleryItemProps> = props => {
    let buttonRef: HTMLButtonElement | undefined;

    const { bus, isModal, current } = useGallerySelectionContext();

    const isCurrent = () => current()?.id === props.item.id;

    const handleOnFocus = () => bus?.emit({ name: 'onFocus', target: props.item.id });
    const handleOnClick = () => {
        if (current()) {
            bus?.emit({ name: 'onClick', target: props.item.id });
        } else {
            bus?.emit({ name: 'onSelect', target: props.item.id });
        }
    };
    const handleOnSelect = () => bus?.emit({ name: 'onSelect', target: props.item.id });
    const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.code === 'Space') {
            ev.preventDefault();
            handleOnSelect();
        }
    };

    createEffect(() => {
        if (!isModal() && isCurrent() && buttonRef) {
            buttonRef.focus();
            // TODO set focus when modal closes
        }
    });

    const url = () => makeImageUrl(props.item);
    const date = () => (props.item.date ? new Date(props.item.date).toString() : '');
    const label = () => `Gaallery item. ${date()}. Press to open details.`;

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
                <ItemCheckbox id={props.item.id} onFocus={handleOnFocus} />
                <img alt="" src={url()} />
            </button>
        </Flex>
    );
};
