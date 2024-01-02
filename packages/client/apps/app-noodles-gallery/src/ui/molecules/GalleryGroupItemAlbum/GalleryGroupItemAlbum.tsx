import { Display } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { inject } from '@noodlestan/ui-services';
import { SkeletonText } from '@noodlestan/ui-skeletons';
import { Surface } from '@noodlestan/ui-surfaces';
import { Accessor, Component, JSX } from 'solid-js';

import { AlbumsService } from '@/services/Albums';
import { GalleryGroup, GalleryGroupAttributesAlbum } from '@/ui/models/gallery/types';
import { GalleryGroupHeader } from '@/ui/molecules/GalleryGroupHeader/GalleryGroupHeader';

import './GalleryGroupItemAlbum.css';

type GalleryGroupItemAlbumProps = {
    children: JSX.Element;
    group: Accessor<GalleryGroup>;
};

export const GalleryGroupItemAlbum: Component<GalleryGroupItemAlbumProps> = props => {
    const classList = () => ({
        GalleryGroupItemAlbum: true,
    });

    const { getAlbumBySlug } = inject(AlbumsService);

    const attributes = (): GalleryGroupAttributesAlbum =>
        props.group().attributes as GalleryGroupAttributesAlbum;

    const albumName = () => {
        const name = attributes().album;
        if (name) {
            return getAlbumBySlug(name)?.title;
        } else {
            return 'no album';
        }
    };

    return (
        <Surface variant="card">
            <Flex classList={classList()} direction="column" padding="l">
                <GalleryGroupHeader group={props.group}>
                    <Display level={2}>
                        <SkeletonText size="l">{albumName()}</SkeletonText>
                    </Display>
                </GalleryGroupHeader>
                {props.children}
            </Flex>
        </Surface>
    );
};
