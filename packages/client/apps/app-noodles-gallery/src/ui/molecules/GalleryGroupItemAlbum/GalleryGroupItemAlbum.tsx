import { Display } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Surface } from '@noodlestan/ui-surfaces';
import { Accessor, Component, JSX } from 'solid-js';

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

    const attributes = (): GalleryGroupAttributesAlbum =>
        props.group().attributes as GalleryGroupAttributesAlbum;

    return (
        <Surface variant="card">
            <Flex classList={classList()} direction="column" padding="l">
                <GalleryGroupHeader group={props.group}>
                    <Display level={2}>{attributes().album || 'no album'}</Display>
                </GalleryGroupHeader>
                {props.children}
            </Flex>
        </Surface>
    );
};
