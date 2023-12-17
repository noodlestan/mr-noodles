import { Flex } from '@noodlestan/ui-layouts';
import { Accessor, Component } from 'solid-js';

import { GalleryGroupItem, GallerySubGroupItem } from '@/ui/models/gallery/types';
import { PhotoRows } from '@/ui/molecules/PhotoRows/PhotoRows';

type GallerySubItemsProps = {
    group: Accessor<GalleryGroupItem>;
};

export const GallerySubItems: Component<GallerySubItemsProps> = props => {
    const items = () => (props.group() as GallerySubGroupItem).items || [];

    return (
        <Flex direction="column">
            <PhotoRows rows={() => [items()]} />
        </Flex>
    );
};
