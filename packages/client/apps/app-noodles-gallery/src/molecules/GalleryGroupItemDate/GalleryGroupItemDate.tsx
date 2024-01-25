import { Display } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Accessor, Component, JSX } from 'solid-js';

import { GalleryGroup, GalleryGroupAttributesDate } from '@/models/gallery/types';
import { GalleryGroupHeader } from '@/molecules/GalleryGroupHeader/GalleryGroupHeader';

import './GalleryGroupItemDate.css';

type GalleryGroupItemDateProps = {
    children: JSX.Element;
    group: Accessor<GalleryGroup>;
};

export const GalleryGroupItemDate: Component<GalleryGroupItemDateProps> = props => {
    const classList = () => ({
        GalleryGroupItemDate: true,
    });

    const attributes = (): GalleryGroupAttributesDate =>
        props.group().attributes as GalleryGroupAttributesDate;

    const date = (): string => {
        const d = attributes().date;
        if (d?.valueOf()) {
            return new Intl.DateTimeFormat('en-GB', {
                dateStyle: 'medium',
                timeZone: 'Europe/Madrid',
            }).format(d);
        } else {
            return 'no date';
        }
    };

    return (
        <Flex classList={classList()} direction="column">
            <GalleryGroupHeader group={props.group}>
                <Flex direction="row" gap="s">
                    {/* <Display level={3} size="s">{attributes().group}</Display> */}
                    <Display level={3} size="s">
                        {date()}
                    </Display>
                </Flex>
            </GalleryGroupHeader>
            {props.children}
        </Flex>
    );
};
