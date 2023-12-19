import { Flex } from '@noodlestan/ui-layouts';
import { Accessor, Component } from 'solid-js';

import { GalleryGroup } from '@/ui/models/gallery/types';
import { GalleryGroupChildren } from '@/ui/molecules/GalleryGroupChildren/GalleryGroupChildren';
import { GalleryGroupItem } from '@/ui/molecules/GalleryGroupItem/GalleryGroupItem';
import { GalleryOptions } from '@/ui/organisms/Gallery/types';

import './GalleryGroupSurface.css';

type GalleryGroupSurfaceProps = {
    group: Accessor<GalleryGroup>;
    options: Accessor<GalleryOptions>;
};

export const GalleryGroupSurface: Component<GalleryGroupSurfaceProps> = props => {
    const classList = () => ({
        GalleryGroupSurface: true,
    });

    return (
        <Flex classList={classList()}>
            <GalleryGroupItem group={props.group}>
                <GalleryGroupChildren group={props.group} options={props.options} />
            </GalleryGroupItem>
        </Flex>
    );
};
