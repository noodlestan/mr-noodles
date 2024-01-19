import type { FileNoodle, ImageNoodle, MediaFileNoodle } from '@noodlestan/shared-types';
// import { Text } from '@noodlestan/ui-atoms';
import { Component, Show } from 'solid-js';

import { GalleryItemImage } from '../GalleryItemImage/GalleryItemImage';

export type GalleryItemFileProps = {
    item: FileNoodle;
    showCheckbox?: boolean;
};

export const GalleryItemFile: Component<GalleryItemFileProps> = props => {
    const imageNoodle = () => props.item as MediaFileNoodle;
    const mediaType = () => imageNoodle().mediaType;

    return (
        <>
            <Show when={mediaType() === 'image'}>
                <GalleryItemImage item={props.item as ImageNoodle} />
            </Show>

            <Show when={mediaType() === 'video'}>
                <GalleryItemImage item={props.item as ImageNoodle} />
            </Show>
        </>
    );
};
