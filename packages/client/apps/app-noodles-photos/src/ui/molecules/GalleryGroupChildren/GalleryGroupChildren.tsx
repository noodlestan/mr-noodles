import { Accessor, Component, Show } from 'solid-js';

import { GallerySubGroups } from '../GallerySubGroups/GallerySubGroups';
import { GallerySubItems } from '../GallerySubItems/GallerySubItems';

import { GalleryGroupItem, GallerySubGroupItem } from '@/ui/models/gallery/types';

type GalleryGroupChildrenProps = {
    group: Accessor<GalleryGroupItem>;
};
export const GalleryGroupChildren: Component<GalleryGroupChildrenProps> = props => {
    const groups = () => (props.group() as GalleryGroupItem).groups;
    const items = () => (props.group() as GallerySubGroupItem).items;
    return (
        <>
            <Show when={groups()}>
                <GallerySubGroups group={props.group} />
            </Show>
            <Show when={items()}>
                <GallerySubItems group={props.group} />
            </Show>
        </>
    );
};
