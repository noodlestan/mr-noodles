import { Flex } from '@noodlestan/ui-layouts';
import { Accessor, Component } from 'solid-js';

import { GalleryGroupItem, GallerySubGroupItem } from '@/models/gallery/types';
import { GalleryItemRows } from '@/molecules/GalleryItemRows/GalleryItemRows';
import { GalleryOptions } from '@/organisms/Gallery/types';

type GallerySubItemsProps = {
    group: Accessor<GalleryGroupItem>;
    options: Accessor<GalleryOptions>;
};

export const GallerySubItems: Component<GallerySubItemsProps> = props => {
    const items = () => (props.group() as GallerySubGroupItem).rows || [];
    const rowOptions = () => props.options().rows;

    return (
        <Flex direction="column">
            <GalleryItemRows rows={() => items()} options={rowOptions} />
        </Flex>
    );
};
