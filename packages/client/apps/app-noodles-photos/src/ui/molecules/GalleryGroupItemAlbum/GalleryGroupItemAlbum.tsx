import { Display } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Surface } from '@noodlestan/ui-surfaces';
import { Accessor, Component, JSX } from 'solid-js';

import { GalleryGroupHeader } from '../GalleryGroupHeader/GalleryGroupHeader';

import { GalleryGroup, GalleryGroupAttributesAlbum } from '@/ui/models/gallery/types';

import './GalleryGroupItemAlbum.css';

type GalleryGroupItemAlbumProps = {
    children: JSX.Element;
    group: Accessor<GalleryGroup>;
};

export const GalleryGroupItemAlbum: Component<GalleryGroupItemAlbumProps> = props => {
    const classList = () => ({
        GalleryGroupAlbumSurface: true,
    });

    const attributes = (): GalleryGroupAttributesAlbum =>
        props.group().attributes as GalleryGroupAttributesAlbum;

    return (
        <Surface variant="card">
            <Flex classList={classList()} direction="column" gap="m" padding="l">
                <GalleryGroupHeader group={props.group}>
                    <Display level={2}>{attributes().album || 'no album'}</Display>
                </GalleryGroupHeader>
                {props.children}
            </Flex>
        </Surface>
    );
};
