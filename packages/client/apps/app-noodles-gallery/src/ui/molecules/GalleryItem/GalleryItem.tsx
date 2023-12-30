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
    const classList = () => ({
        GalleryItem: true,
    });

    let buttonRef: HTMLButtonElement | undefined;

    // const date = () => (props.item.date ? new Date(props.item.date).toString() : '');

    const { bus, isModal, current } = useGallerySelectionContext();

    const emitOnFocus = () => bus?.emit({ name: 'onFocus', target: props.item.id });
    const emitOnClick = () => bus?.emit({ name: 'onClick', target: props.item.id });
    const emitOnSelect = () => bus?.emit({ name: 'onSelect', target: props.item.id });
    const handleKeyDown = (ev: KeyboardEvent) => {
        if (ev.code === 'Space') {
            ev.preventDefault();
            emitOnSelect();
        }
    };

    createEffect(() => {
        if (!isModal() && current()?.id === props.item.id && buttonRef) {
            buttonRef.focus();
            // TODO set focus when modal closes
        }
    });

    const url = () => makeImageUrl(props.item);

    return (
        <Flex gap="m" classList={classList()}>
            <button
                ref={buttonRef}
                tabindex="0"
                class="GalleryItem--button"
                onFocus={emitOnFocus}
                onClick={emitOnClick}
                onKeyDown={handleKeyDown}
            >
                <ItemCheckbox id={props.item.id} />
                <img alt="" src={url()} />
            </button>
            {/* <Text size="s">Date:{date()}</Text> */}
        </Flex>
    );
};
