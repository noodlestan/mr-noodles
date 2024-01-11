import { Display, DisplayLevel } from '@noodlestan/ui-atoms';
import { SkeletonText } from '@noodlestan/ui-skeletons';
import { Component, Show } from 'solid-js';

import { AlbumLink } from '@/atoms/AlbumLink/AlbumLink';
import { BreadcrumbFolderIcon } from '@/atoms/BreadcrumbFolderIcon/BreadcrumbFolderIcon';

import './AlbumTitle.css';

type AlbumTitleProps = {
    slug: string;
    title: string;
    showIcon?: boolean;
    showLink?: boolean;
    level?: DisplayLevel;
};

const defaultProps = {
    level: 3 as DisplayLevel,
};

export const AlbumTitle: Component<AlbumTitleProps> = props => {
    const level = () => props.level || defaultProps.level;
    const size = () => (level() < 3 ? 'xl' : 's');
    const slug = () => props.slug;
    const title = () => (props.title || props.slug).split('/').pop() || slug();

    return (
        <>
            <Show when={!props.title}>
                <SkeletonText size="l" />
            </Show>
            <Show when={props.title}>
                <Display level={level()} size={size()} nowrap classList={{ AlbumTitle: true }}>
                    <Show when={props.showIcon}>
                        <BreadcrumbFolderIcon hasLink={true} isOpen={false} />
                    </Show>
                    <Show when={props.showLink}>
                        <AlbumLink name={title()} path={props.slug} />
                    </Show>
                    <Show when={!props.showLink}>
                        <span class="AlbumTitle--text">{title()}</span>
                    </Show>
                </Display>
            </Show>
        </>
    );
};
