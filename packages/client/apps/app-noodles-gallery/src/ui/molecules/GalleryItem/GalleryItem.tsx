import type { PhotoData, Thumb } from '@noodlestan/shared-types';
// import { Text } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Component, createEffect } from 'solid-js';

import { useGallerySelectionContext } from '@/ui/providers/GallerySelection/GallerySelection';

import './GalleryItem.css';

export type GalleryItemProps = {
    item: PhotoData;
};

export const selectThumbByHeight = (
    thumbs: Thumb[] | undefined,
    height: number,
): Thumb | undefined => {
    const first = thumbs && thumbs[0];
    const last = thumbs && thumbs[thumbs.length - 1];
    const fallbackThumb = height > 0 ? last : first;
    return thumbs?.find(item => item.h >= height) || fallbackThumb;
};

const thumbUrl = (item: PhotoData) => {
    const thumb = selectThumbByHeight(item.thumbs, 200);
    return thumb ? thumb.f : `http://localhost:8008/photos/${item.id}/thumb?h=200`;
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
        }
    };
    const handleKeyUp = (ev: KeyboardEvent) => {
        if (ev.code === 'Space') {
            emitOnSelect();
        }
    };

    createEffect(() => {
        if (!isModal() && current() === props.item.id && buttonRef) {
            buttonRef.focus();
            // TODO set focus when modal closes
        }
    });

    const thumb = () => thumbUrl(props.item);

    return (
        <Flex gap="m" classList={classList()}>
            <button
                ref={buttonRef}
                tabindex="0"
                class="GalleryItem--button"
                onFocus={emitOnFocus}
                onClick={emitOnClick}
                onKeyDown={handleKeyDown}
                onKeyPress={handleKeyUp}
            >
                <img alt="" src={thumb()} />
            </button>
            {/* <Text size="s">Date:{date()}</Text> */}
        </Flex>
    );
};
