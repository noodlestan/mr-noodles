import { Display, IconButton } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { inject } from '@noodlestan/ui-services';
import { SkeletonText } from '@noodlestan/ui-skeletons';
import { useSearchParams } from '@solidjs/router';
import { X } from 'lucide-solid';
import { Component, For, Show } from 'solid-js';

import { BreadcrumbFolderIcon } from '../../atoms/BreadcrumbFolderIcon/BreadcrumbFolderIcon';

import { FolderLink } from '@/atoms/FolderLink/FolderLink';
import { useUrl } from '@/navigation/useUrl';
import { useFoldersQueryContext } from '@/providers/FoldersQuery';
import { FoldersService } from '@/services/Folders';

import './FoldersBreadcrumbs.css';

type BreadcrumbPartProps = {
    index: number;
    length: number;
    part: { name: string; path: string };
};

const FoldersBreadcrumbPart: Component<BreadcrumbPartProps> = props => {
    const isAllButLast = () => props.index < props.length - 1;
    const isLast = () => props.index === props.length - 1;
    const classList = () => ({
        FoldersBreadcrumbPart: true,
        'FoldersBreadcrumbPart-has-link': isAllButLast(),
    });

    return (
        <Flex direction="row" gap="s" align="start" classList={classList()} tag="span">
            <Show when={isAllButLast()}>
                <FolderLink
                    showIcon={true}
                    name={props.part.name}
                    path={props.part.path}
                    isOpen={true}
                />
            </Show>
            <Show when={isLast()}>
                <BreadcrumbFolderIcon isOpen={true} />
                <span class="FoldersBreadcrumbPart--Text">{props.part.name}</span>
            </Show>
            <Show when={isAllButLast()}>
                <span> / </span>
            </Show>
        </Flex>
    );
};

export const FoldersBreadcrumbs: Component = () => {
    const { getFolderBySlug } = inject(FoldersService);
    const { parent } = useFoldersQueryContext();

    const folder = () => {
        const parentSlug = parent();
        return parentSlug ? getFolderBySlug(parentSlug) : undefined;
    };

    const titleParts = () => {
        const maybeFolder = folder();
        const slugParts = maybeFolder?.slug.split('/') || [];
        const maybeTitle = maybeFolder?.title;
        const titleParts = maybeTitle?.split('/') || slugParts;
        return titleParts.map((name, index) => {
            return {
                name,
                path: slugParts.slice(0, index + 1).join('/'),
            };
        });
    };

    const [searchParams] = useSearchParams();
    const rootUrl = () => useUrl(searchParams, '/folders');

    // const navigate = useNavigate();

    const classList = () => ({
        FoldersBreadcrumbs: true,
    });

    return (
        <Show when={parent()}>
            <Display level={3} size="s">
                <Flex tag="span" direction="row" align="start" classList={classList()}>
                    <Show when={!folder()}>
                        <SkeletonText size="m" /> <span>/</span> <SkeletonText size="m" />
                    </Show>
                    <Show when={folder()}>
                        <span class="FoldersBreadcrumbPart">
                            <IconButton icon={X} variant="plain" size="s" href={rootUrl()} />
                        </span>
                        <For each={titleParts()}>
                            {(part, index) => (
                                <FoldersBreadcrumbPart
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
