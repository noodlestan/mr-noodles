import { Flex } from '@noodlestan/ui-layouts';
import { Accessor, Component, For } from 'solid-js';

import { GallerySubGroup } from '../GallerySubGroup/GallerySubGroup';

import { GalleryGroupItem } from '@/ui/models/gallery/types';

import './GallerySubGroups.css';

type GallerySubGroupsProps = {
    group: Accessor<GalleryGroupItem>;
};

export const GallerySubGroups: Component<GallerySubGroupsProps> = props => {
    const classList = () => ({
        GallerySubGroups: true,
    });

    const groups = () => (props.group() as GalleryGroupItem).groups;

    return (
        <Flex direction="column" classList={classList()}>
            Groups
            <For each={groups()}>{group => <GallerySubGroup group={() => group} />}</For>
        </Flex>
    );
};
