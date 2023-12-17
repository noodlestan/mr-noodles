import { Display } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Surface } from '@noodlestan/ui-surfaces';
import { Accessor, Component, JSX } from 'solid-js';

import { GalleryGroupHeader } from '../GalleryGroupHeader/GalleryGroupHeader';

import { GalleryGroup, GalleryGroupAttributesDate } from '@/ui/models/gallery/types';

import './GalleryGroupItemDate.css';

type GalleryGroupItemDateProps = {
    children: JSX.Element;
    group: Accessor<GalleryGroup>;
};

export const GalleryGroupItemDate: Component<GalleryGroupItemDateProps> = props => {
    const classList = () => ({
        GalleryGroupDateSurface: true,
    });

    const attributes = (): GalleryGroupAttributesDate =>
        props.group().attributes as GalleryGroupAttributesDate;

    return (
        <Surface variant="stage">
            <Flex classList={classList()} direction="column" gap="m" padding="l">
                <GalleryGroupHeader group={props.group}>
                    <Display level={2}>by {attributes().group}</Display>
                    <Display level={2}>{attributes().value || 'no date'}</Display>
                </GalleryGroupHeader>
                {props.children}
            </Flex>
        </Surface>
    );
};
