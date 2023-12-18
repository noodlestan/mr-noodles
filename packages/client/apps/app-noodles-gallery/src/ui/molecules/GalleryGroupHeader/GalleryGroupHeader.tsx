import { Flex } from '@noodlestan/ui-layouts';
import { Accessor, Component } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

import { GalleryGroup } from '@/ui/models/gallery/types';

import './GalleryGroupHeader.css';

type GalleryGroupHeaderProps = {
    children: JSX.Element;
    group: Accessor<GalleryGroup>;
};

export const GalleryGroupHeader: Component<GalleryGroupHeaderProps> = props => {
    return <Flex direction="row"> {props.children}</Flex>;
};
