import { Flex } from '@noodlestan/ui-layouts';
import { Accessor, Component } from 'solid-js';
import { JSX } from 'solid-js/jsx-runtime';

import { GalleryGroup } from '@/models/gallery/types';

import './GalleryGroupHeader.css';

type GalleryGroupHeaderProps = {
    children: JSX.Element;
    group: Accessor<GalleryGroup>;
};

export const GalleryGroupHeader: Component<GalleryGroupHeaderProps> = props => {
    return (
        <Flex classList={{ GalleryGroupHeader: true }} direction="row" gap="s">
            {props.children}
        </Flex>
    );
};
