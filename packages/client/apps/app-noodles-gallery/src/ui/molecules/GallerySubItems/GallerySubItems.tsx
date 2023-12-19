import { Flex } from '@noodlestan/ui-layouts';
import { Accessor, Component } from 'solid-js';

import { GalleryGroupItem, GallerySubGroupItem } from '@/ui/models/gallery/types';
import { GalleryItemRows } from '@/ui/molecules/GalleryItemRows/GalleryItemRows';
import { GalleryOptions } from '@/ui/organisms/Gallery/types';

type GallerySubItemsProps = {
    group: Accessor<GalleryGroupItem>;
    options: Accessor<GalleryOptions>;
};

export const GallerySubItems: Component<GallerySubItemsProps> = props => {
    const items = () => (props.group() as GallerySubGroupItem).rows || [];

    return (
        <Flex direction="column">
            <GalleryItemRows rows={() => items()} options={props.options} />
        </Flex>
    );
};
