import { Accessor, Component, JSX, Show } from 'solid-js';

import { GalleryGroup, GalleryGroupAttributes } from '@/models/gallery/types';
import { GalleryGroupItemDate } from '@/molecules/GalleryGroupItemDate/GalleryGroupItemDate';
import { GalleryGroupItemFolder } from '@/molecules/GalleryGroupItemFolder/GalleryGroupItemFolder';

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
            <Show when={groupBy() === 'folder'}>
                <GalleryGroupItemFolder group={props.group}>
                    {props.children}
                </GalleryGroupItemFolder>
            </Show>
            <Show when={groupBy() === 'date'}>
                <GalleryGroupItemDate group={props.group}>{props.children}</GalleryGroupItemDate>
            </Show>
        </>
    );
};
