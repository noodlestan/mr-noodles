import { Display, IconButton } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { inject } from '@noodlestan/ui-services';
import { SkeletonText } from '@noodlestan/ui-skeletons';
import { useNavigate } from '@solidjs/router';
import { X } from 'lucide-solid';
import { Component, For, Show } from 'solid-js';

import { BreadcrumbFolderIcon } from '../../atoms/BreadcrumbFolderIcon/BreadcrumbFolderIcon';

import { AlbumLink } from '@/atoms/AlbumLink/AlbumLink';
import { useAlbumsQueryContext } from '@/providers/AlbumsQuery';
import { AlbumsService } from '@/services/Albums';

import './AlbumsBreadcrumbs.css';

type BreadcrumbPartProps = {
    index: number;
    length: number;
    part: { name: string; path: string };
};

const AlbumsBreadcrumbPart: Component<BreadcrumbPartProps> = props => {
    const isAllButLast = () => props.index < props.length - 1;
    const isLast = () => props.index === props.length - 1;
    const classList = () => ({
        AlbumsBreadcrumbPart: true,
        'AlbumsBreadcrumbPart-has-link': isAllButLast(),
    });

    return (
        <Flex direction="row" gap="s" align="start" classList={classList()}>
            <Show when={isAllButLast()}>
                <AlbumLink
                    showIcon={true}
                    name={props.part.name}
                    path={props.part.path}
                    isOpen={true}
                />
            </Show>
            <Show when={isLast()}>
                <BreadcrumbFolderIcon isOpen={true} />
                {props.part.name}
            </Show>
            <Show when={isAllButLast()}>
                <span> / </span>
            </Show>
        </Flex>
    );
};

export const AlbumsBreadcrumbs: Component = () => {
    const { getAlbumBySlug } = inject(AlbumsService);
    const { parent } = useAlbumsQueryContext();

    const album = () => {
        const parentSlug = parent();
        return parentSlug ? getAlbumBySlug(parentSlug) : undefined;
    };

    const titleParts = () => {
        const maybeAlbum = album();
        const slugParts = maybeAlbum?.slug.split('/') || [];
        const maybeTitle = maybeAlbum?.title;
        const titleParts = maybeTitle?.split('/') || slugParts;
        return titleParts.map((name, index) => {
            return {
                name,
                path: slugParts.slice(0, index + 1).join('/'),
            };
        });
    };

    const rootUrl = () => `/albums${window.location.search}`;

    const navigate = useNavigate();

    const classList = () => ({
        AlbumsBreadcrumbs: true,
    });

    return (
        <Show when={parent()}>
            <Display level={3} size="s">
                <Flex tag="span" direction="row" gap="s" align="start" classList={classList()}>
                    <Show when={!album()}>
                        <SkeletonText size="l" /> <span>/</span> <SkeletonText size="l" />
                    </Show>
                    <Show when={album()}>
                        <IconButton
                            icon={X}
                            variant="plain"
                            size="s"
                            href={rootUrl()}
                            onTap={() => navigate(rootUrl())}
                        />
                        <For each={titleParts()}>
                            {(part, index) => (
                                <AlbumsBreadcrumbPart
                                    index={index()}
                                    length={titleParts().length}
                                    part={part}
                                />
                            )}
                        </For>
                    </Show>
                </Flex>
            </Display>
        </Show>
    );
};
