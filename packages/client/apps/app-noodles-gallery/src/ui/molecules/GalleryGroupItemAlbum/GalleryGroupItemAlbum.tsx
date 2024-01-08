import { Icon } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { inject } from '@noodlestan/ui-services';
import { Surface } from '@noodlestan/ui-surfaces';
import { FolderIcon } from 'lucide-solid';
import { Accessor, Component, JSX } from 'solid-js';

import { AlbumTitle } from '../AlbumTitle/AlbumTitle';

import { AlbumsService } from '@/services/Albums';
import { GalleryGroup, GalleryGroupAttributesAlbum } from '@/ui/models/gallery/types';
import { GalleryGroupHeader } from '@/ui/molecules/GalleryGroupHeader/GalleryGroupHeader';

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
                <Flex direction="row" align="center" gap="s">
                    <Icon icon={FolderIcon} />
                    <GalleryGroupHeader group={props.group}>
                        <AlbumTitle slug={albumSlug()} title={albumName()} link />
                    </GalleryGroupHeader>
                </Flex>
                {props.children}
            </Flex>
        </Surface>
    );
};
