import { Flex } from '@noodlestan/ui-layouts';
import { Accessor, Component } from 'solid-js';

import { GalleryGroup } from '@/models/gallery/types';
import { GalleryGroupItem } from '@/molecules/GalleryGroupItem/GalleryGroupItem';
import { GallerySubItems } from '@/molecules/GallerySubItems/GallerySubItems';
import { GalleryOptions } from '@/organisms/Gallery/types';

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
