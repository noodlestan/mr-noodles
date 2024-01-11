import { Flex } from '@noodlestan/ui-layouts';
import { inject } from '@noodlestan/ui-services';
import { Surface } from '@noodlestan/ui-surfaces';
import { Accessor, Component, JSX } from 'solid-js';

import { AlbumTitle } from '../AlbumTitle/AlbumTitle';

import { GalleryGroup, GalleryGroupAttributesAlbum } from '@/models/gallery/types';
import { GalleryGroupHeader } from '@/molecules/GalleryGroupHeader/GalleryGroupHeader';
import { AlbumsService } from '@/services/Albums';

import './GalleryGroupItemAlbum.css';

type GalleryGroupItemAlbumProps = {
    children: JSX.Element;
    group: Accessor<GalleryGroup>;
};

export const GalleryGroupItemAlbum: Component<GalleryGroupItemAlbumProps> = props => {
    const { getAlbumBySlug } = inject(AlbumsService);

    const attributes = (): GalleryGroupAttributesAlbum =>
        props.group().attributes as GalleryGroupAttributesAlbum;

    const albumSlug = () => attributes().album || '';
    const albumName = () => {
        const name = attributes().album;
        if (name) {
            return getAlbumBySlug(name)?.title || 'no name';
        } else {
            return 'no album';
        }
    };

    const classList = () => ({
        GalleryGroupItemAlbum: true,
    });

    return (
        <Surface variant="card">
            <Flex classList={classList()} direction="column" padding="m">
                <GalleryGroupHeader group={props.group}>
                    <AlbumTitle slug={albumSlug()} title={albumName()} showLink showIcon />
                </GalleryGroupHeader>
                {props.children}
            </Flex>
        </Surface>
    );
};
