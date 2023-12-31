import { Flex } from '@noodlestan/ui-layouts';
import { Accessor, Component } from 'solid-js';

import { GalleryGroup } from '@/ui/models/gallery/types';
import { GalleryGroupItem } from '@/ui/molecules//GalleryGroupItem/GalleryGroupItem';
import { GallerySubItems } from '@/ui/molecules//GallerySubItems/GallerySubItems';
import { GalleryOptions } from '@/ui/organisms/Gallery/types';

import './GallerySubGroup.css';

type GallerySubGroupProps = {
    group: Accessor<GalleryGroup>;
    options: Accessor<GalleryOptions>;
};

export const GallerySubGroup: Component<GallerySubGroupProps> = props => {
    const classList = () => ({
        GallerySubGroup: true,
    });

    return (
        <Flex classList={classList()}>
            <GalleryGroupItem group={props.group}>
                <GallerySubItems group={props.group} options={props.options} />
            </GalleryGroupItem>
        </Flex>
    );
};
