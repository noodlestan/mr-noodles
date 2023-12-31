import { Display } from '@noodlestan/ui-atoms';
import { SkeletonText } from '@noodlestan/ui-skeletons';
import { Component, Show } from 'solid-js';

import { AlbumLink } from '@/ui/atoms/AlbumLink/AlbumLink';

import './AlbumTitle.css';

type AlbumTitleProps = {
    slug: string;
    title: string;
    link?: boolean;
};

export const AlbumTitle: Component<AlbumTitleProps> = props => {
    const slug = () => props.slug;
    const title = () => (props.title || props.slug).split('/').pop() || slug();

    return (
        <>
            <Show when={!props.title}>
                <SkeletonText size="l" />
            </Show>
            <Show when={props.title}>
                <Display level={3} size="s" nowrap>
                    <Show when={props.link}>
                        <AlbumLink name={title()} path={props.slug} />
                    </Show>
                    <Show when={!props.link}>{title()}</Show>
                </Display>
            </Show>
        </>
    );
};
