import { Accessor, Component, JSX, Show } from 'solid-js';

import { GalleryGroupItemAlbum } from '../GalleryGroupItemAlbum/GalleryGroupItemAlbum';
import { GalleryGroupItemDate } from '../GalleryGroupItemDate/GalleryGroupItemDate';

import { GalleryGroup, GalleryGroupAttributes } from '@/ui/models/gallery/types';

type GalleryGroupItemProps = {
    group: Accessor<GalleryGroup>;
    children: JSX.Element;
};

export const GalleryGroupItem: Component<GalleryGroupItemProps> = props => {
    const attributes = (): GalleryGroupAttributes =>
        props.group().attributes as GalleryGroupAttributes;

    const groupBy = () => attributes().groupBy;

    return (
        <>
            <Show when={groupBy() === 'album'}>
                <GalleryGroupItemAlbum group={props.group}>{props.children}</GalleryGroupItemAlbum>
            </Show>
            <Show when={groupBy() === 'date'}>
                <GalleryGroupItemDate group={props.group}>{props.children}</GalleryGroupItemDate>
            </Show>
        </>
    );
};
