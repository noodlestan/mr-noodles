import { Display, IconButton } from '@noodlestan/ui-atoms';
import { Flex } from '@noodlestan/ui-layouts';
import { inject } from '@noodlestan/ui-services';
import { useSearchParams } from '@solidjs/router';
import { X } from 'lucide-solid';
import { Component, For, Show } from 'solid-js';

import { BreadcrumbFolderIcon } from '../../atoms/BreadcrumbFolderIcon/BreadcrumbFolderIcon';

import { FolderLink } from '@/atoms/FolderLink/FolderLink';
import { useUrl } from '@/navigation/useUrl';
import { useFoldersQueryContext } from '@/providers/FoldersQuery';
import { FoldersService } from '@/services/Folders';
import { RootsService } from '@/services/Roots';

import './FoldersBreadcrumbs.css';

type BreadcrumbPart = {
    type: 'root' | 'folder';
    title: string;
    path: string;
};

type BreadcrumbPartProps = {
    root: string;
    index: number;
    length: number;
    part: BreadcrumbPart;
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
                    title={props.part.title}
                    root={props.root}
                    filename={props.part.path}
                    isOpen={true}
                />
            </Show>
            <Show when={isLast()}>
                <BreadcrumbFolderIcon isOpen={true} isRoot={props.part.path === '/'} />
                <span class="FoldersBreadcrumbPart--Text">{props.part.title}</span>
            </Show>
            <Show when={isAllButLast()}>
                <span class="FoldersBreadcrumbPart--Slash">/</span>
            </Show>
        </Flex>
    );
};

export const FoldersBreadcrumbs: Component = () => {
    const { getRootById } = inject(RootsService);
    const { getFolderByFilename } = inject(FoldersService);
    const { root, parent } = useFoldersQueryContext();

    const folder = () => {
        const r = root();
        const p = parent() || '/';
        return r ? getFolderByFilename(r, p) : undefined;
    };

    const rootCrumb = (): BreadcrumbPart => {
        const id = root() as string;
        const name = getRootById(id)?.name as string;
        return {
            type: 'root',
            title: name,
            path: '/',
        };
    };

    const pathCrumbs = (): BreadcrumbPart[] => {
        const maybeFolder = folder();
        if (!maybeFolder) {
            return [];
        }
        const { filename } = maybeFolder;
        const pathParts = filename !== '/' ? filename.split('/').slice(1) : [];
        return pathParts.map((part, index) => {
            return {
                type: 'folder',
                title: part,
                path: '/' + pathParts.slice(0, index + 1).join('/'),
            };
        });
    };

    const crumbs = () => [rootCrumb(), ...pathCrumbs()];

    const [searchParams] = useSearchParams();
    const foldersUrl = () => useUrl(searchParams, '/folders');

    const classList = () => ({
        FoldersBreadcrumbs: true,
    });

    return (
        <Show when={root()}>
            <Display level={3} size="s">
                <Flex tag="span" direction="row" align="start" classList={classList()}>
                    <span class="FoldersBreadcrumbPart">
                        <IconButton icon={X} variant="plain" size="s" href={foldersUrl()} />
                    </span>
                    <For each={crumbs()}>
                        {(part, index) => (
                            <FoldersBreadcrumbPart
                                index={index()}
                                root={root() as string}
                                length={crumbs().length}
                                part={part}
                            />
                        )}
                    </For>
                </Flex>
            </Display>
        </Show>
    );
};
