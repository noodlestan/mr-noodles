import type { PhotoData, Thumb } from '@noodlestan/shared-types';
// import { Text } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Component } from 'solid-js';

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

    // const date = () => (props.item.date ? new Date(props.item.date).toString() : '');

    const thumb = () => thumbUrl(props.item);
    return (
        <Flex gap="m" classList={classList()}>
            <img alt="" src={thumb()} />
            {/* <Text size="s">Date:{date()}</Text> */}
        </Flex>
    );
};
