import { Accessor, Component, Show } from 'solid-js';

import { GallerySubGroups } from '../GallerySubGroups/GallerySubGroups';
import { GallerySubItems } from '../GallerySubItems/GallerySubItems';

import { GalleryGroupItem, GallerySubGroupItem } from '@/models/gallery/types';
import { GalleryOptions } from '@/organisms/Gallery/types';

type GalleryGroupChildrenProps = {
    group: Accessor<GalleryGroupItem>;
    options: Accessor<GalleryOptions>;
};
export const GalleryGroupChildren: Component<GalleryGroupChildrenProps> = props => {
    const groups = () => (props.group() as GalleryGroupItem).groups;
    const items = () => (props.group() as GallerySubGroupItem).rows;
    return (
        <>
            <Show when={groups()}>
                <GallerySubGroups group={props.group} options={props.options} />
            </Show>
            <Show when={items()}>
                <GallerySubItems group={props.group} options={props.options} />
            </Show>
        </>
    );
};
