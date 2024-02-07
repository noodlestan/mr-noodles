import { Display, DisplayLevel } from '@noodlestan/ui-atoms';
import { inject } from '@noodlestan/ui-services';
import { SkeletonText } from '@noodlestan/ui-skeletons';
import { Component, Show } from 'solid-js';

import { BreadcrumbFolderIcon } from '@/atoms/BreadcrumbFolderIcon/BreadcrumbFolderIcon';
import { FolderLink } from '@/atoms/FolderLink/FolderLink';
import { RootsService } from '@/services/Roots';

import './FolderTitle.css';

type FolderTitleProps = {
    root: string;
    filename: string;
    title?: string;
    showIcon?: boolean;
    showLink?: boolean;
    level?: DisplayLevel;
};

const defaultProps = {
    level: 3 as DisplayLevel,
};

export const FolderTitle: Component<FolderTitleProps> = props => {
    const { getRootById } = inject(RootsService);

    const level = () => props.level || defaultProps.level;
    const size = () => (level() < 3 ? 'xl' : 's');
    const isRoot = () => props.filename === '/';
    const root = () => getRootById(props.root);
    const autoTitle = () => props.title || (props.filename.split('/').pop() as string);
    const title = () => (isRoot() ? (root()?.name as string) : autoTitle());

    return (
        <>
            <Show when={!title()}>
                <SkeletonText size="l" />
            </Show>
            <Show when={title()}>
                <Display level={level()} size={size()} nowrap classList={{ FolderTitle: true }}>
                    <Show when={props.showIcon}>
                        <BreadcrumbFolderIcon hasLink={true} isOpen={false} isRoot={isRoot()} />
                    </Show>
                    <Show when={props.showLink}>
                        <FolderLink
                            root={root()?.id || ''}
                            title={title()}
                            filename={props.filename}
                        />
                    </Show>
                    <Show when={!props.showLink}>
                        <span class="FolderTitle--Text">{title()}</span>
                    </Show>
                </Display>
            </Show>
        </>
    );
};
