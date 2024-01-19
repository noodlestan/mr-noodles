import type { ImageNoodle } from '@noodlestan/shared-types';
// import { Text } from '@noodlestan/ui-atoms';
import { Component } from 'solid-js';

import { makeImageUrl } from '@/services/Images/makeImageUrl';

import './GalleryItemImage.css';

export type GalleryItemImageProps = {
    item: ImageNoodle;
    showCheckbox?: boolean;
};

export const GalleryItemImage: Component<GalleryItemImageProps> = props => {
    const imageUrl = () => makeImageUrl('files', props.item, 'thumb.small');

    return (
        <div class="GalleryItemImage">
            <img alt="" src={imageUrl()} />
        </div>
    );
};
