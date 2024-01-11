import { Flex } from '@noodlestan/ui-layouts';
import { Accessor, Component, For } from 'solid-js';

import { GalleryGroupItem } from '@/models/gallery/types';
import { GallerySubGroup } from '@/molecules/GallerySubGroup/GallerySubGroup';
import { GalleryOptions } from '@/organisms/Gallery/types';

import './GallerySubGroups.css';

type GallerySubGroupsProps = {
    group: Accessor<GalleryGroupItem>;
    options: Accessor<GalleryOptions>;
};

export const GallerySubGroups: Component<GallerySubGroupsProps> = props => {
    const classList = () => ({
        GallerySubGroups: true,
    });

    const groups = () => (props.group() as GalleryGroupItem).groups;

    return (
        <Flex direction="column" gap="s" classList={classList()}>
            <For each={groups()}>
                {group => <GallerySubGroup group={() => group} options={props.options} />}
            </For>
        </Flex>
    );
};
