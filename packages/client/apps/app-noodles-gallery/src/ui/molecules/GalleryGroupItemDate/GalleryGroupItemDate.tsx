import { Display } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { Surface } from '@noodlestan/ui-surfaces';
import { Accessor, Component, JSX } from 'solid-js';

import { GalleryGroup, GalleryGroupAttributesDate } from '@/ui/models/gallery/types';
import { GalleryGroupHeader } from '@/ui/molecules//GalleryGroupHeader/GalleryGroupHeader';

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
        if (d) {
            return new Intl.DateTimeFormat('en-GB', {
                dateStyle: 'medium',
                timeZone: 'Europe/Madrid',
            }).format(d);
        } else {
            return 'no date';
        }
    };

    return (
        <Surface variant="stage">
            <Flex classList={classList()} direction="column" padding="m">
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
        </Surface>
    );
};
